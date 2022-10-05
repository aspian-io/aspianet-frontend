import { useCallback, useEffect, useState } from "react";

export const useTimer = ( remainingTime: number ) => {
  const [ timer, setTimer ] = useState( remainingTime );
  const getRemainingMinutes = useCallback(
    ( seconds: number ) => {
      const mins = Math.floor( timer / 60 );
      return String( mins ).padStart( 2, '0' );
    },
    [ timer ]
  );

  const getRemainingSeconds = useCallback(
    ( seconds: number ) => {
      const sec = timer - Math.floor( timer / 60 ) * 60;
      return String( sec ).padStart( 2, '0' );
    },
    [ timer ]
  );

  const [ timerMinutes, setTimerMinutes ] = useState( getRemainingMinutes( timer ) );
  const [ timerSeconds, setTimerSeconds ] = useState( getRemainingSeconds( timer ) );

  useEffect( () => {
    const interval = setInterval( () => {
      setTimer( timer - 1 );
      setTimerMinutes( getRemainingMinutes( timer ) );
      setTimerSeconds( getRemainingSeconds( timer ) );
    }, 1000 );

    if ( timer < 0 ) clearInterval( interval );

    return () => {
      clearInterval( interval );
    };
  }, [ getRemainingMinutes, getRemainingSeconds, timer ] );

  return { timer, timerMinutes, timerSeconds };
};