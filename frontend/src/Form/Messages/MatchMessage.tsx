import { MatchedFacility } from "../Form"
import Confetti from 'react-confetti';
import { useEffect, useState} from 'react';

interface MatchMessageProps {
  matchedFacility : MatchedFacility
}

export default function MatchMessage({ matchedFacility } : MatchMessageProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      <div className="p-5">
        {showConfetti && <Confetti width={400} height={500} numberOfPieces={70} />}

        <p>We have found a facility <b className="text-indigo-500">near you</b> that matches your needs!</p>
        <br></br>
        <div className="">
          <p>Facility: <b className="text-indigo-500">{matchedFacility.name}</b></p>
          <p>Zip Code: <b className="text-indigo-500">{matchedFacility.zipCode}</b></p>
        </div>
      </div>
    </>
  )
}