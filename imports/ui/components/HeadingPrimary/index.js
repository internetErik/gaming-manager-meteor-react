import React from 'react';

const HeadingPrimary = ({ className, text, render}) => (
<h1 className={`heading-primary ${ className || '' }`}>
{ (render && render()) || text }
</h1>
)

export default HeadingPrimary;
