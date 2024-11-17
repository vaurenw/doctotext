import { NextResponse } from "next/server";
import { load } from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Fetch the documentation
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch documentation");
    }

    const html = await response.text();

    // Use cheerio for better HTML parsing
    const $ = load(html);

    // Remove unwanted elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();
    $('.navigation').remove();
    $('.sidebar').remove();
    $('.menu').remove();
    $('.ads').remove();

    // Extract main content
    const mainContent = $('main, article, .content, .documentation, #content, #main')
      .first()
      .text()
      .trim();

    // Use the main content if found, otherwise use the body content
    const text = mainContent || $('body').text();

    // Clean up the text
    const cleanText = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Format the text for AI consumption
    const formattedText = `
Source URL: ${url}
Timestamp: ${new Date().toISOString()}
Content-Length: ${cleanText.length}
---

${cleanText}
    `.trim();

    return new NextResponse(formattedText, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Documentation conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert documentation" },
      { status: 500 }
    );
  }
}