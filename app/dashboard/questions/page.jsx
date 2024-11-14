import React from 'react'
import FAQ from '../_data/FAQ'


function Questions() {
    return (
        <div className='p-10'>
            <div className="space-y-4">
                {FAQ.map((item, index) => (
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
                        >
                            <h2 className="font-medium">{item.question}</h2>

                            <svg
                                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>

                        <p className="mt-4 px-4 leading-relaxed text-gray-700">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    )
}

export default Questions