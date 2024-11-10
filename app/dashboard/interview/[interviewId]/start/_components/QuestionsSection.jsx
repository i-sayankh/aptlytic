"use client";

import { LightbulbIcon, Volume2 } from 'lucide-react';
import React from 'react';
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {
    const textToSpeach = (text) => {
        console.log('Text: ', text);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            if (!window.speechSynthesis.speaking) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            } else {
                alert('Speech is already in progress.');
            }
        } else {
            alert('Speech Synthesis API is not supported in this browser.');
        }
    };


    return mockInterviewQuestions && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestions && mockInterviewQuestions.map((question, index) => (
                    <h2 className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
                        ${activeQuestionIndex === index ? 'bg-primary text-white' : ''}`}>
                        Question {index + 1}
                    </h2>
                ))}
            </div>

            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeach(mockInterviewQuestions[activeQuestionIndex]?.question)} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
                <h2 className='flex gap-2 items-center text-primary'>
                    <LightbulbIcon />
                    <strong>Note: </strong>
                </h2>
                <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default QuestionsSection