import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

interface ProjectionsSummaryProps {
  years: number;
  amount: number;
  unit: string;
}

const ProjectionsSummary: React.FC<ProjectionsSummaryProps> = ({
  years,
  amount,
  unit,
}) => {
  // The two possible messages
  const defaultText = `Get finance confidence with Finimize! tweak your inputs and unveil your ${years}-year savings outlook.`;
  const resultText  = `Boom! That’s ${unit}${amount.toFixed(2)} in ${years} years...💰`;
  // Decide which one we want to show
  const isResult = amount > 0;
  const fullText = isResult ? resultText : defaultText;

  const [displayed, setDisplayed] = useState(fullText);

  useEffect(() => {
    // If no result, display prompt statically
    if (!isResult) {
      setDisplayed(fullText);
      return;
    }

    // Otherwise animate letter by letter
    setDisplayed('');
    let idx = 0;
    const intervalId = window.setInterval(() => {
      idx += 1;
      setDisplayed(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(intervalId);
      }
    }, 30);

    // cleanup on prop changes
    return () => clearInterval(intervalId);
  }, [fullText, isResult]);

  return (
    <Text fontSize="lg" fontStyle={isResult ? 'normal' : 'italic'} whiteSpace="pre-wrap">
      {displayed}
    </Text>
  );
};

export default ProjectionsSummary;
