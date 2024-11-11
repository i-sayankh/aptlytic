"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswersSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result.transcript)
        ));
    }, [results]);

    const SaveUserAnswer = async () => {
        if (isRecording) {
            setIsLoading(true);
            stopSpeechToText();
            if (userAnswer?.length < 10) {
                setIsLoading(false);
                toast('Error while saving your answer, Please record again.');
                return;
            }

            const feedbackPrompt = `Evaluate the following user answer based on the given interview question, and provide a rating and 
            constructive feedback. The feedback should highlight strengths and suggest specific areas for improvement if needed.

            Output in JSON format with:
                rating: A numeric rating from 1 to 5, where 1 is 'Poor' and 5 is 'Excellent.'
                feedback: A detailed assessment that addresses both positive aspects and specific suggestions for improvement.
            
                Input:
                    Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}
                    User Answer: ${userAnswer}
                
                Desired Output Format:
                    {
                        "rating": <numeric_rating>,
                        "feedback": "<detailed_feedback>"
                    }
                Please respond with only the JSON object.`;

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJSONResponse = (result.response.text()).replace('```json', '').replace('```', '');
            console.log('JSON Response: ', JSON.parse(mockJSONResponse));
            const JSONFeedbackResponse = JSON.parse(mockJSONResponse);

            const response = await db.insert(UserAnswer).values({
                mockIdReference: interviewData.mockId,
                question: mockInterviewQuestions[activeQuestionIndex]?.question,
                correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.answer,
                userAnswer: userAnswer,
                feedback: JSONFeedbackResponse?.feedback,
                rating: JSONFeedbackResponse?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),

            });

            if (response) {
                toast.success('User Answer recorded successfully.');
                setUserAnswer('');
                setResults([]);
            }

            setResults([]);
            setIsLoading(false);
        } else {
            startSpeechToText();
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' alt='webcam icon' />
                <Webcam
                    mirrored={true}
                    style={{ width: '100%', height: '300', zIndex: 10 }}
                />
            </div>

            <Button
                disabled={isLoading}
                variant={'outline'}
                className='my-10'
                onClick={SaveUserAnswer}
            >
                {isRecording ? <h2 className='text-red-600 flex gap-2'><Mic />Stop Recording</h2> : 'Record Answer'}
            </Button>
        </div>


    )
}

export default RecordAnswersSection