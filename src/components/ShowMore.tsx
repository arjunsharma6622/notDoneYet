"use client"
import ShowMoreText from "react-show-more-text";

const ShowMore = ({content} : {content : string}) => {
  return (
    <ShowMoreText
    /* Default options */
    lines={2}
    more="Show more"
    className="content-css"
    anchorClass="show-more-less-clickable"
    expanded={false}
    truncatedEndingComponent={"... "}
    less={false}
  >
    <p className="">{content}</p>
  </ShowMoreText>  )
}

export default ShowMore