"use client";

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdReference, params.interviewId))
                .orderBy(UserAnswer.id);

            console.log('Result: ', result);

            if (result.length > 0) {
                const totalRating = result.reduce((sum, item) => sum + Number(item.rating || 0), 0);
                const avgRating = (totalRating / result.length).toFixed(1); // Calculate and round to 1 decimal place
                setAverageRating(avgRating);
            }

            setFeedbackList(result);

        } catch (error) {
            console.log('Error generating response: ', error.message);
        }
    };

    return (
        <div className='p-10'>
            {feedbackList?.length === 0 ? <h2 className='font-bold text-xl text-gray-500'>No Interview Record Found</h2> :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>{averageRating} / 5</strong></h2>
                    <h2 className='text-sm text-gray-500'>Find below the feedback for each question</h2>

                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-6'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
                                {item.question} <ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}/5</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAnswer}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAnswer}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>}


            <Button className='mt-5' onClick={() => router.push('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default Feedback