export default function GeneratePdfExport(bodyPdf = '', footerPdf = '') {
  const newWindow = window.open('', '', 'width=800, height=500');
  const document = newWindow.document.open();

  const pageContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    </head>
    <body>
      ${bodyPdf}
      ${footerPdf}
    </body>
   </html>
  `;
  try {
    document.write(pageContent);
    document.close();
    setTimeout(() => {
      newWindow.print();
    }, 500);
  } catch (error) {
    // console.log(error);
  }
}
