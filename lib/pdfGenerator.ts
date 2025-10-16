import jsPDF from 'jspdf';

interface Gap {
  title: string;
  description: string;
  exposure?: string;
}

interface PDFData {
  userName: string;
  userEmail: string;
  company: string;
  score: number;
  gaps: Gap[];
  strengths: string[];
  date: string;
}

export const generateCompliancePDF = (data: PDFData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, fontStyle: string = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * (fontSize * 0.4));
  };

  // Header Section - Premium Design matching website
  const addHeader = () => {
    // Emerald header background matching website theme
    doc.setFillColor(6, 95, 70); // Emerald-800
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Company Logo Area - Millstone Compliance
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('M', margin, 22);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('MILLSTONE COMPLIANCE', margin + 12, 22);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(209, 250, 229); // Light emerald (emerald-100)
    doc.text('PPT COMPLIANCE SOLUTIONS', margin + 12, 27);
    
    // Report Title - Right aligned
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    const titleText = 'Compliance Report';
    const titleWidth = doc.getTextWidth(titleText);
    doc.text(titleText, pageWidth - margin - titleWidth, 32);
    
    yPosition = 60;
  };

  // Personalized Welcome Message
  const addWelcomeMessage = () => {
    // Welcome message background
    doc.setFillColor(236, 253, 245); // Emerald-50
    doc.roundedRect(margin, yPosition, contentWidth, 45, 3, 3, 'F');
    
    // Border accent
    doc.setDrawColor(5, 150, 105); // Emerald-600
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPosition, contentWidth, 45, 3, 3, 'S');
    
    yPosition += 8;
    
    // Personalized greeting
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70); // Emerald-800
    doc.text(`Dear ${data.userName},`, margin + 5, yPosition);
    
    yPosition += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(6, 95, 70); // Emerald-800
    const welcomeText = `Thank you for completing your PPT Compliance Assessment. We've prepared this personalized report to help you understand where you stand and what steps you can take to protect your business from HMRC penalties.`;
    yPosition = addWrappedText(welcomeText, margin + 5, yPosition, contentWidth - 10, 9, 'normal');
    
    yPosition += 8;
  };

  // Client Information Card
  const addClientInfo = () => {
    // Card background
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(margin, yPosition, contentWidth, 28, 3, 3, 'F');
    
    // Border accent
    doc.setDrawColor(209, 250, 229); // Emerald-100
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPosition, contentWidth, 28, 3, 3, 'S');
    
    yPosition += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70); // Emerald-800
    doc.text('CLIENT INFORMATION', margin + 5, yPosition);
    
    yPosition += 7;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70); // Emerald-800
    doc.text(data.userName, margin + 5, yPosition);
    
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(5, 150, 105); // Emerald-600
    doc.text(data.company, margin + 5, yPosition);
    
    yPosition += 1;
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.text(data.userEmail, margin + 5, yPosition + 4);
    
    yPosition += 12;
  };

  // Score Section - Clean and Clear Design
  const addScoreSection = () => {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text('YOUR COMPLIANCE SCORE', margin, yPosition);
    
    yPosition += 10;
    
    // Score circle background
    const scoreX = pageWidth / 2;
    const scoreY = yPosition + 30;
    const scoreRadius = 28;
    
    // Outer circle (full) - light background
    doc.setFillColor(236, 253, 245); // Emerald-50
    doc.circle(scoreX, scoreY, scoreRadius, 'F');
    
    // Border circle
    doc.setDrawColor(209, 250, 229); // Emerald-100
    doc.setLineWidth(2);
    doc.circle(scoreX, scoreY, scoreRadius, 'S');
    
    // Score-based colored arc
    const scorePercentage = data.score / 100;
    const scoreColor = data.score >= 90 
      ? [34, 197, 94] // Green-500
      : data.score >= 70 
      ? [234, 179, 8] // Yellow-500
      : data.score >= 50 
      ? [249, 115, 22] // Orange-500
      : [239, 68, 68]; // Red-500
    
    doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.setLineWidth(5);
    
    // Draw arc for score
    const startAngle = -90;
    const endAngle = startAngle + (360 * scorePercentage);
    const segments = 60;
    const angleStep = (endAngle - startAngle) / segments;
    
    for (let i = 0; i < segments; i++) {
      const angle1 = (startAngle + (i * angleStep)) * Math.PI / 180;
      const angle2 = (startAngle + ((i + 1) * angleStep)) * Math.PI / 180;
      
      const x1 = scoreX + scoreRadius * Math.cos(angle1);
      const y1 = scoreY + scoreRadius * Math.sin(angle1);
      const x2 = scoreX + scoreRadius * Math.cos(angle2);
      const y2 = scoreY + scoreRadius * Math.sin(angle2);
      
      doc.line(x1, y1, x2, y2);
    }
    
    // Score text - large and clear
    doc.setFontSize(42);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    const scoreText = data.score.toString();
    const scoreTextWidth = doc.getTextWidth(scoreText);
    doc.text(scoreText, scoreX - (scoreTextWidth / 2), scoreY + 4);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139); // Slate-500
    const outOf100 = '/100';
    const outOf100Width = doc.getTextWidth(outOf100);
    doc.text(outOf100, scoreX - (outOf100Width / 2), scoreY + 12);
    
    // Score level with personalized message
    yPosition = scoreY + scoreRadius + 12;
    const scoreLevel = data.score >= 90 
      ? 'Audit-Ready - Excellent!'
      : data.score >= 70 
      ? 'Strong Foundation - Nearly There'
      : data.score >= 50 
      ? 'Compliance Risk - Action Needed'
      : 'Critical Gaps - Urgent Attention Required';
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    const scoreLevelWidth = doc.getTextWidth(scoreLevel);
    doc.text(scoreLevel, scoreX - (scoreLevelWidth / 2), yPosition);
    
    yPosition += 18;
  };

  // Gaps Section with human-friendly language
  const addGapsSection = () => {
    if (data.gaps.length === 0) {
      // No gaps - add congratulations message
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 95, 70);
      doc.text('EXCELLENT NEWS!', margin, yPosition);
      
      yPosition += 8;
      
      doc.setFillColor(220, 252, 231); // Green-100
      doc.roundedRect(margin, yPosition, contentWidth, 20, 3, 3, 'F');
      
      doc.setDrawColor(34, 197, 94); // Green-500
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, yPosition, contentWidth, 20, 3, 3, 'S');
      
      yPosition += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(20, 83, 45); // Green-900
      const congratsText = `We didn't identify any critical compliance gaps. Your PPT documentation appears to be in great shape!`;
      yPosition = addWrappedText(congratsText, margin + 5, yPosition, contentWidth - 10, 10, 'normal');
      
      yPosition += 10;
      return;
    }
    
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text(`AREAS TO ADDRESS (${data.gaps.length})`, margin, yPosition);
    
    yPosition += 6;
    
    // Friendly intro message
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(6, 95, 70);
    const introText = `We've identified ${data.gaps.length} area${data.gaps.length > 1 ? 's' : ''} that need your attention. Don't worry - these are common issues, and we can help you fix them.`;
    yPosition = addWrappedText(introText, margin, yPosition, contentWidth, 9, 'normal');
    
    yPosition += 8;
    
    data.gaps.forEach((gap, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = margin + 10;
      }
      
      // Calculate gap card height dynamically
      const tempY = yPosition;
      let cardHeight = 8;
      
      // Gap card background
      doc.setFillColor(254, 243, 199); // Amber-100
      
      yPosition += 5;
      
      // Gap number and title
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(120, 53, 15); // Amber-900
      doc.text(`${index + 1}.`, margin + 3, yPosition);
      const titleLines = doc.splitTextToSize(gap.title, contentWidth - 12);
      doc.text(titleLines, margin + 8, yPosition);
      cardHeight += titleLines.length * 4.5;
      yPosition += titleLines.length * 4.5;
      
      yPosition += 2;
      
      // Gap description
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(146, 64, 14); // Amber-800
      const descLines = doc.splitTextToSize(gap.description, contentWidth - 12);
      doc.text(descLines, margin + 8, yPosition);
      cardHeight += descLines.length * 4;
      yPosition += descLines.length * 4;
      
      // Exposure if present
      if (gap.exposure) {
        yPosition += 3;
        cardHeight += 8;
        doc.setFillColor(251, 191, 36); // Amber-400
        doc.roundedRect(margin + 8, yPosition - 4, 50, 7, 2, 2, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(`Risk: ${gap.exposure}`, margin + 10, yPosition);
        yPosition += 4;
      }
      
      // Draw the card background and border
      doc.setFillColor(254, 243, 199); // Amber-100
      doc.roundedRect(margin, tempY, contentWidth, cardHeight, 3, 3, 'F');
      
      doc.setDrawColor(251, 191, 36); // Amber-400
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, tempY, contentWidth, cardHeight, 3, 3, 'S');
      
      yPosition = tempY + cardHeight + 5;
    });
    
    yPosition += 5;
  };

  // Strengths Section with encouragement
  const addStrengthsSection = () => {
    if (data.strengths.length === 0) {
      yPosition += 5;
      return;
    }
    
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin + 10;
    }
    
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text(`WHAT YOU'RE DOING WELL (${data.strengths.length})`, margin, yPosition);
    
    yPosition += 6;
    
    // Encouraging intro message
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(6, 95, 70);
    const introText = `Great work! You already have these important compliance elements in place:`;
    yPosition = addWrappedText(introText, margin, yPosition, contentWidth, 9, 'normal');
    
    yPosition += 8;
    
    // Display strengths in a single column for clarity
    data.strengths.forEach((strength, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin + 10;
      }
      
      // Strength card
      doc.setFillColor(220, 252, 231); // Green-100
      doc.roundedRect(margin, yPosition, contentWidth, 10, 2, 2, 'F');
      
      doc.setDrawColor(34, 197, 94); // Green-500
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, yPosition, contentWidth, 10, 2, 2, 'S');
      
      // Checkmark and text
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(20, 83, 45); // Green-900
      doc.text('✓', margin + 3, yPosition + 6.5);
      const strengthText = doc.splitTextToSize(strength, contentWidth - 10);
      doc.text(strengthText, margin + 8, yPosition + 6.5);
      
      yPosition += 12;
    });
    
    yPosition += 5;
  };

  // Footer
  const addFooter = (pageNum: number) => {
    const footerY = pageHeight - 15;
    
    // Footer line
    doc.setDrawColor(209, 250, 229); // Emerald-100
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    
    // Footer text - left side
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70); // Emerald-800
    doc.text('Millstone Compliance', margin, footerY);
    
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(5, 150, 105); // Emerald-600
    doc.text('PPT Compliance Solutions', margin, footerY + 4);
    
    // Footer text - right side (date)
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(data.date, pageWidth - margin - doc.getTextWidth(data.date), footerY + 2);
    
    // Page number - center
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    const pageText = `Page ${pageNum} of 2`;
    const pageTextWidth = doc.getTextWidth(pageText);
    doc.text(pageText, pageWidth / 2 - (pageTextWidth / 2), footerY + 2);
  };

  // Recommendation Section with personalized advice
  const addRecommendationSection = () => {
    // Check if we need a new page
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = margin + 10;
      addFooter(doc.internal.getCurrentPageInfo().pageNumber);
    }
    
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text('RECOMMENDED NEXT STEPS', margin, yPosition);
    
    yPosition += 8;
    
    // Recommendation card with emerald theme
    doc.setFillColor(6, 95, 70); // Emerald-800
    doc.roundedRect(margin, yPosition, contentWidth, 50, 3, 3, 'F');
    
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    
    const recommendation = data.score >= 90
      ? 'Maintenance & Monitoring'
      : data.score >= 70
      ? 'Expert Documentation Audit'
      : data.score >= 50
      ? 'Comprehensive Compliance Overhaul'
      : 'Emergency Compliance Package';
    
    doc.text(recommendation, margin + 5, yPosition);
    yPosition += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(209, 250, 229); // Emerald-100
    
    const description = data.score >= 90
      ? 'Your compliance is excellent! We recommend quarterly reviews to keep everything audit-ready and stay ahead of regulatory changes.'
      : data.score >= 70
      ? 'You\'re close to full compliance. We\'ll review your documentation, identify the remaining gaps, and provide a clear action plan to fix them.'
      : data.score >= 50
      ? 'Let\'s get your compliance sorted. We\'ll conduct a full review, organize your records, and provide hands-on support to make you audit-ready.'
      : 'We understand this feels urgent - and it is. We\'ll organize everything for you, get your documentation in order, and make you compliant quickly.';
    
    yPosition = addWrappedText(description, margin + 5, yPosition, contentWidth - 10, 9, 'normal');
    
    yPosition += 8;
    
    // Contact information in card
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Ready to get started?', margin + 5, yPosition);
    
    yPosition += 5;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Email us or call for a free consultation - we\'re here to help.', margin + 5, yPosition);
    
    yPosition += 60;
  };

  // Build the PDF
  addHeader();
  addWelcomeMessage();
  addClientInfo();
  addScoreSection();
  addFooter(1);
  
  // Add new page for details
  doc.addPage();
  yPosition = margin + 10;
  
  addGapsSection();
  addStrengthsSection();
  addRecommendationSection();
  addFooter(2);

  // Save the PDF with clear filename
  const fileName = `Millstone_Compliance_Report_${data.userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

