// Abstracted from ScrollSpy to allow for easier customizations
export const onScrollUpdate = ( entry: IntersectionObserverEntry, isInVewPort: ( entry: IntersectionObserverEntry, offset?: number ) => boolean ) => {
  const { target, boundingClientRect } = entry;
  const menuItem = document.querySelector( `[data-scrollspy-id="#${ target.id }"]` );
  if ( isInVewPort( entry ) ) {
    menuItem?.classList.remove( "lg:hoverable:hover:text-primary", "lg:text-zinc-700", "lg:before:invisible", "lg:before:opacity-0" );
    menuItem?.classList.add( "active", "lg:text-primary", "lg:before:visible", "lg:before:opacity-100" );
  } else {
    // if ( menuItem?.classList.contains( "active" ) ) {
    menuItem?.classList.remove( "active", "lg:text-primary", "lg:before:visible", "lg:before:opacity-100" );
    menuItem?.classList.add( "lg:hoverable:hover:text-primary", "lg:text-zinc-700", "lg:before:invisible", "lg:before:opacity-0" );
    // }
  }
};