import ExcelJS from 'exceljs';

const exportController = {
  async toSheet(ctx) {
    const body = ctx.request.body;
    const attributes = body.attributes;
    const entries = body.entries;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Exported Entries');

    worksheet.columns = attributes.map((attr) => ({
      header: attr.label,
      key: attr.field,
      width: 20,
    }));

    for (const entry of entries) {
      let row: any = {};
      for (const attr of attributes) {
        row[attr.field] = entry[attr.field];
      }
      worksheet.addRow(row);
    }

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFDDEBF7' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();

    ctx.set('Content-Disposition', 'attachment; filename="exported_entries.xlsx"');
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.body = buffer;
  },
};

export default exportController;
