import { format } from "date-fns";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "dd.MM.yyyy");
};
export default formatDate;

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};

export const formatDocumentsIDs = (documentsIDs: Record<string, any>) => {
  if (!documentsIDs || !documentsIDs.items) {
    return { ids: [] };
  }

  let formattedIDs: string[] = [];
  for (let i = 0; i < documentsIDs.items.length; i++) {
    formattedIDs.push(documentsIDs.items[i].encodedId);
  }

  return { ids: formattedIDs };
};

export const formatHistogramData = (histogramsInfo: Record<string, any>) => {
  const totalDocumentsData = histogramsInfo.data[0]?.data;
  const riskFactorsData = histogramsInfo.data[1]?.data;

  const slides = [];

  // Перебираем данные и формируем слайды
  for (let i = 0; i < totalDocumentsData?.length; i++) {
    const totalDocumentsValue = totalDocumentsData[i].value;
    const riskFactorsValue = riskFactorsData[i].value;
    const date = totalDocumentsData[i].date;
    const dateFormated = formatDate(date);

    slides.push({
      date: dateFormated,
      totalDocuments: totalDocumentsValue,
      riskFactors: riskFactorsValue,
    });
  }

  return slides;
};

export const parseXmlContent = (xmlString: string) => {
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(xmlString, "text/xml");

  let text = "";
  const sentences = xmlDocument.querySelectorAll("sentence");

  sentences.forEach((sentence) => {
    sentence.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as Element;
        if (element.tagName === "entity") {
          text += element.textContent;
        } else {
          text += element.outerHTML;
        }
      }
    });
  });

  const document = parser.parseFromString(text, "text/html");
  const images = document.getElementsByTagName("img");

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (!img.src) {
      const parent = img.parentElement;
      if (parent && parent.tagName.toLowerCase() === "picture") {
        const source = parent.querySelector("source");
        if (source && source.srcset) {
          img.src = source.srcset;
        }
      } else {
        img.remove();
        i--;
      }
    }
  }

  const firstImage = images.length > 0 ? images[0] : null;

  if (firstImage) {
    firstImage.onerror = () => {
      firstImage.style.display = "none";
    };
  }

  return { textNodes: document.body.childNodes, image: firstImage || null };
};

export function formatNumberWithSpacesAndSuffix(number: number) {
  const formattedNumber = number
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  let suffix;
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    suffix = "вариантов";
  } else {
    switch (lastDigit) {
      case 1:
        suffix = "вариант";
        break;
      case 2:
      case 3:
      case 4:
        suffix = "варианта";
        break;
      default:
        suffix = "вариантов";
    }
  }

  return `${formattedNumber} ${suffix}`;
}

export function formatNumberWithSpacesAndSuffixForDocument(number: number) {
  const formattedNumber = number
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  let suffix;
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    suffix = "слов";
  } else {
    switch (lastDigit) {
      case 1:
        suffix = "слово";
        break;
      case 2:
      case 3:
      case 4:
        suffix = "слова";
        break;
      default:
        suffix = "слов";
    }
  }

  return `${formattedNumber} ${suffix}`;
}
