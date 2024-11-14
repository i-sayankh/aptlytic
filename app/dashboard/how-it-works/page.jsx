import React from 'react'

function HowItWorks() {
    return (
        <div className='p-10'>
            <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Master Your Interview Skills with Ease!
                        </h2>

                        <p className="hidden text-gray-500 md:mt-4 md:block">
                            Our platform is designed to make interview preparation simple, effective, and insightful. Start by selecting
                            your interview type and follow the guided prompts to set up your interview environment—no complicated setup
                            required! Each session presents you with realistic interview questions tailored to your chosen field,
                            assessing both content and delivery in real time. With our AI-driven feedback, you’ll receive an in-depth
                            performance analysis covering strengths, improvement areas, and tips on how to refine your responses.
                            You can review your interview report anytime, and with a subscription, access personalized insights,
                            exclusive resources, and additional practice sessions to boost your confidence and readiness. Preparing for
                            your dream job has never been this engaging!
                        </p>

                        <div className="mt-4 md:mt-8">
                            <a
                                href='/dashboard'
                                className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring"
                            >
                                Get Started Today
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    alt=""
                    src="https://blog.internshala.com/wp-content/uploads/2023/09/What-is-a-Mock-Interview.jpg"
                    className="h-56 w-full object-cover sm:h-full"
                />
            </section>
        </div>
    )
}

export default HowItWorks