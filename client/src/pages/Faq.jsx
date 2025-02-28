import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What is ChatHub?",
    answer: "ChatHub is a secure chatting platform that allows users to communicate safely with end-to-end encryption.",
  },
  {
    question: "How do I create an account?",
    answer: "You can create an account by signing up with your email and setting a secure password.",
  },
  {
    question: "Is ChatHub free to use?",
    answer: "Yes, ChatHub offers free access to basic chat features.",
  },
  {
    question: "How is my data secured?",
    answer: "ChatHub uses end-to-end encryption to ensure that your messages remain private and secure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-[2rem] my-[5rem] mt-[8rem] border-1 border border-[#2B7372] rounded-lg shadow-lg shadow-[#2B7372]">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#4ABEBD]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow text-[#2B7372] border-[#2B7372]">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between w-full text-left text-lg font-semibold "
            >
              {faq.question}
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-[#4ABEBD]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

