export const contentFormat = async (content: string, words: number) => {
  const stripeHtmlTags = (htmlString: string) => {
    return htmlString?.replace(/<[^>]*>/g, "");
  };

  const contentWithoutH1 = content?.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, "");

  const finalContent = contentWithoutH1?.replace(
    /<h1[^>]*>[\s\S]*?<\/h1>|<select[^>]*>[\s\S]*?<\/select>|<textarea[^>]*>[\s\S]*?<\/textarea>/gi,
    ""
  );

  const textwithoutHtml = stripeHtmlTags(contentWithoutH1);
  const firstWords = textwithoutHtml?.split(/\s+/)?.splice(0, words)?.join(" ");

  const h1Match = content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1ElementWithoutTag = h1Match ? stripeHtmlTags(h1Match[1]) : "";

  const imageMatch = content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
  const imgSrc = imageMatch ? imageMatch[1] : "";

  return {
    h1ElementWithoutTag,
    textwithoutHtml,
    finalContent,
    firstWords,
    imgSrc,
  };
};

export const topics = [
  { value: "Javascript", label: "Javascript" },
  { value: "Python", label: "Python" },
  { value: "Programming", label: "Programming" },
  { value: "php", label: "php" },
  { value: "java", label: "java" },
  { value: "angular", label: "angular" },
];
