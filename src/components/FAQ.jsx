import React, { useState } from 'react';

const faqs = [
    {
        question: 'What is your return policy?',
        answer:
            'We offer a 7-day return policy on all unused products in original packaging. Please contact our support for a return authorization before sending anything back.'
    },
    {
        question: 'How long does shipping take?',
        answer:
            'Shipping usually takes 2-5 business days within Bangladesh. International shipping times may vary depending on location.'
    },
    {
        question: 'How can I track my order?',
        answer:
            'Once your order is shipped, you will receive an email with a tracking link. You can also track your order from your account dashboard.'
    },
    {
        question: 'Do you offer customer support?',
        answer:
            'Yes! Our support team is available 7 days a week via email and live chat. We are here to help with any questions or issues.'
    },
    {
        question: 'What is your return policy?',
        answer:
            'We offer a 7-day return policy on all unused products in original packaging. Please contact our support for a return authorization before sending anything back.'
    },
    {
        question: 'How long does shipping take?',
        answer:
            'Shipping usually takes 2-5 business days within Bangladesh. International shipping times may vary depending on location.'
    },
    {
        question: 'How can I track my order?',
        answer:
            'Once your order is shipped, you will receive an email with a tracking link. You can also track your order from your account dashboard.'
    },
    {
        question: 'Do you offer customer support?',
        answer:
            'Yes! Our support team is available 7 days a week via email and live chat. We are here to help with any questions or issues.'
    },
    {
        question: 'What is your return policy?',
        answer:
            'We offer a 7-day return policy on all unused products in original packaging. Please contact our support for a return authorization before sending anything back.'
    },
    {
        question: 'How long does shipping take?',
        answer:
            'Shipping usually takes 2-5 business days within Bangladesh. International shipping times may vary depending on location.'
    },
    {
        question: 'How can I track my order?',
        answer:
            'Once your order is shipped, you will receive an email with a tracking link. You can also track your order from your account dashboard.'
    },
    {
        question: 'Do you offer customer support?',
        answer:
            'Yes! Our support team is available 7 days a week via email and live chat. We are here to help with any questions or issues.'
    },
    {
        question: 'What is your return policy?',
        answer:
            'We offer a 7-day return policy on all unused products in original packaging. Please contact our support for a return authorization before sending anything back.'
    },
    {
        question: 'How long does shipping take?',
        answer:
            'Shipping usually takes 2-5 business days within Bangladesh. International shipping times may vary depending on location.'
    },
    {
        question: 'How can I track my order?',
        answer:
            'Once your order is shipped, you will receive an email with a tracking link. You can also track your order from your account dashboard.'
    },
    {
        question: 'Do you offer customer support?',
        answer:
            'Yes! Our support team is available 7 days a week via email and live chat. We are here to help with any questions or issues.'
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = idx => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-2xl w-full mx-auto px-2 sm:px-4 md:px-6 py-6 bg-[#90165929] rounded-xl shadow-lg border border-[#400E32]">
            <h2 className="text-xl sm:text-2xl font-bold text-left mb-6 sm:mb-8 text-[#400E32] tracking-wide">FAQs</h2>
            <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-[#400E32] pb-2">
                        <button
                            className={`w-full flex justify-between items-center text-left font-medium text-base sm:text-lg text-[#400E32] focus:outline-none transition-colors ${openIndex === idx ? 'text-[#A61F69]' : ''}`}
                            onClick={() => toggle(idx)}
                            aria-expanded={openIndex === idx}
                        >
                            <span className="flex-1 pr-2">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 ml-2 flex-shrink-0 transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="text-gray-700 text-sm sm:text-base px-1 pb-2 leading-relaxed">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;