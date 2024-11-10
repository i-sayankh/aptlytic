"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswersSection from './_components/RecordAnswersSection';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    // console.log(`Interview id: ${params.interviewId}`);
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
    console.log(jsonMockResponse);

    setMockInterviewQuestions(jsonMockResponse);
    setInterviewData(result[0]);
  };

  return (
    <div >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/*Questions*/}
        <QuestionsSection mockInterviewQuestions={mockInterviewQuestions} activeQuestionIndex={activeQuestionIndex} />

        {/* Video/Audio Recording */}
        <RecordAnswersSection />
      </div>
    </div>
  )
}

export default StartInterview