/**
 * Using wildcards to check if the provided string fulfills the rule
 * 
 * @param str A string to check
 * @param rule Wildcard rule (e.g. video/* or image/*)
 * @returns boolean
 */
export function matchRule ( str: string, rule: string ) {
  const escapeRegexp = ( str: string ) => str.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
  return new RegExp( "^" + rule.split( "*" ).map( escapeRegexp ).join( ".*" ) + "$" ).test( str );
};

/**
 * Using wildcards to check if the provided string fulfills the rules
 * 
 * @param str A string to check
 * @param rules Wildcard rule (e.g. video/* or image/*)
 * @returns boolean
 */
export function matchRules ( str: string, rules: string[] ) {
  if ( rules.length > 0 ) {
    return rules.some( r => matchRule( str, r ) );
  }
  return false;
}