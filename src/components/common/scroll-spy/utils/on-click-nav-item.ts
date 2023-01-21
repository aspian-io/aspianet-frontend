// control the click event
export const onClickNavItem = ( e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
  e.preventDefault();
  // Set the hash
  window.location.hash = e.currentTarget.hash;

  // Scroll to the section + 1 to account for weird bug.
  // remove the `+1` and click on Section 2 link to see the bug.
  const targetSection = document.querySelector( `${ e.currentTarget.hash }` ) as HTMLElement;
  window.scrollTo( 0, targetSection.offsetTop - 105 );
};