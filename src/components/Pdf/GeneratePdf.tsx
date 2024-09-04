import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Client } from '../../types/Client/Client';

const generatePdf = (clients: Client[]) => {
  (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Relatório de Clientes',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const data = clients.map((client) => {
    return [
      { text: client.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: client.cpf, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: client.email, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*'],
        body: [
          [
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'CPF', style: 'tableHeader', fontSize: 10 },
            { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
          ],
          ...data,
        ],
      },
      layout: 'lightHorizontalLines',
    },
  ];

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePdf;
