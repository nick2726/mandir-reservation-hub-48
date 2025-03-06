
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (
  element: HTMLDivElement, 
  fileName: string,
  options: {
    orientation?: 'portrait' | 'landscape';
    format?: [number, number] | 'a4';
    toast: any;
    successMessage: string;
    errorMessage: string;
    loadingMessage: string;
  }
) => {
  const { orientation = 'portrait', format = 'a4', toast, successMessage, errorMessage, loadingMessage } = options;
  
  toast({
    title: "Generating PDF",
    description: loadingMessage,
  });
  
  try {
    const canvas = await html2canvas(element, { 
      scale: 2,
      logging: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });
    
    const imgWidth = format === 'a4' ? 210 : format[0];
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
    
    toast({
      title: "Pass Downloaded",
      description: successMessage,
    });
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast({
      title: "Download Failed",
      description: errorMessage,
      variant: "destructive",
    });
    return false;
  }
};
