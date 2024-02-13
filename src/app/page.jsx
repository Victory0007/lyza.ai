"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/VWn0MO0G7er
 */
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PhraseQuestionExtractor from "../utils/KeywordParser";
import { useState } from "react";

export default function LyzaHome() {
  const [paragraph, setParagraph] = useState("");
  const [textList, setTextList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedIndexes, setCopiedIndexes] = useState([]);

  const handleCopyButtonClicked = (index) => {
    const textToCopy = document.querySelector(`.text-to-copy-${index}`);
    if (textToCopy) {
      // Create a temporary textarea element to hold the text
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy.textContent;
      document.body.appendChild(tempTextArea);

      // Select and copy the text
      tempTextArea.select();
      document.execCommand("copy");

      // Remove the temporary textarea
      document.body.removeChild(tempTextArea);

      // Update state to indicate that text has been copied for the given index
      setCopiedIndexes((prevIndexes) => [...prevIndexes, index]);

      // Reset copied state after a delay (e.g., 2 seconds)
      setTimeout(() => {
        setCopiedIndexes((prevIndexes) =>
          prevIndexes.filter((idx) => idx !== index)
        );
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setParagraph(event.target.value);
  };

  return (
    <div className='flex flex-col w-[100vw] items-center justify-center space-y-4 p-4'>
      <h1 className='text-3xl font-bold text-center'>Lyza.ai</h1>
      <div className='flex flex-col w-full space-y-2 items-center'>
        <div className='flex flex-col space-y-1 w-full items-center'>
          <label className='text-sm font-medium' htmlFor='data'>
            Enter your data
          </label>
          <Textarea
            className='h-[200px] max-h-[200px] overflow-auto'
            id='data'
            placeholder='Enter your data...'
            type='text'
            value={paragraph}
            onChange={handleChange}
          />
        </div>
        <div className='flex w-full items-center justify-center space-x-2'>
          <Button
            onClick={() => {
              const extractor = new PhraseQuestionExtractor(2, 4);
              const combinedList = extractor.extractPhrasesAndQuestions(
                paragraph.toLowerCase()
              );
              setTextList(combinedList);
            }}
          >
            Process Data
          </Button>
        </div>
      </div>
      <div className='flex flex-col w-full space-y-2 items-center'>
        <div className='relative flex items-center justify-center space-x-2 w-full'>
          <label className='text-sm font-medium' htmlFor='checkboxes'>
            Processed Data
          </label>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2'>
          {textList.map((x, i) => (
            <div
              key={x}
              className='flex flex-row justify-center gap-[120px] items-center' // Removed 'text-center'
            >
              <p
                className={`text-sm leading-6 text-to-copy-${i}`}
                style={{ width: "100px" }}
              >
                {x}
              </p>
              <Button
                onClick={() => handleCopyButtonClicked(i)}
                disabled={copiedIndexes.includes(i)}
                className={x}
              >
                {copiedIndexes.includes(i) ? "Copied" : "Copy"}
              </Button>
            </div>
          ))}
        </div>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          Text will be copied when the copy button is clicked!
        </p>
      </div>
    </div>
  );
}
