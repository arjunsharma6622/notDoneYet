// import { useState } from "react";
// import { Document, Page } from "react-pdf";

// export function PdfComp({ file }: { file: string }) {
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }

//   return (
//     <div className="overflow-hidden rounded-lg w-fit">
//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page
//           scale={1}
//           width={500}
//           height={500}
//           pageNumber={1}
//           renderTextLayer={false}
//           renderAnnotationLayer={false}
//         />
//       </Document>
//     </div>
//   );
// }
