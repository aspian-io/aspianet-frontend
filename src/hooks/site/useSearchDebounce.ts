import { useEffect, useState, Dispatch, SetStateAction } from "react";

export const useSearchDebounce = ( delayInMs: number = 350 ): [ string | null, Dispatch<SetStateAction<string | null>> ] => {
  const [ search, setSearch ] = useState<string | null>( null );
  const [ searchQuery, setSearchQuery ] = useState<string | null>( null );

  useEffect( () => {
    const delayFn = setTimeout( () => setSearch( searchQuery ), delayInMs );
    return () => clearTimeout( delayFn );
  }, [ searchQuery, delayInMs ] );

  return [ search, setSearchQuery ];
};