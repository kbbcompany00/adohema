import { useState, useMemo } from "react";
import { Search, Filter, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface AITool {
  name: string;
  description: string;
  url: string;
  category: string;
  source: string;
}
const aiTools: AITool[] = [
  {
    name: "ChatGPT",
    description: "پیشەترین چات بۆ گفتوگۆ، نووسین و چارەسەرکردن.",
    url: "https://chat.openai.com",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "Claude",
    description: "یارمەتی AI بۆ گفتوگۆی یارمەتی، بێ زیان و راسپاردن.",
    url: "https://claude.ai",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "Bard",
    description: "خزمەتی گفتوگۆی گووگڵ کە لەسەر لامدا پەیوەندیدارە.",
    url: "https://bard.google.com",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "Character.AI",
    description: "درستکردن و گفتوگۆ کردن لەگەڵ کردارەکانی AI بۆ ئیشکراو و رۆڵپەلی",
    url: "https://character.ai",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "Perplexity AI",
    description: "مەکۆی گەڕانی پەیوەندیدار کە وەڵامە سەرچاوەدارەکان پێشکەش دەکات",
    url: "https://www.perplexity.ai",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "You.com",
    description: "مەکۆی گەڕانی AI کە ئەنجامەکان و فێچەرەکانی گفتوگۆی تایبەتی پێشکەش دەکات",
    url: "https://you.com",
    category: "چاتبات",
    source: "دەستی"
  },
  {
    name: "DALL-E 3",
    description: "نوێترین دروستکەری وێنەی AI کە وێنەی ڕاستەقینە لەسەر بنچینەی نووسین دروست دەکات",
    url: "https://openai.com/dall-e-3",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Midjourney",
    description: "دروستکەری هنر AI کە وێنەی باکیفیەت لەسەر بنچینەی نووسین دروست دەکات",
    url: "https://www.midjourney.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Stable Diffusion",
    description: "مۆدێلی AIی ئازاد بۆ دروستکردنی وێنە لەسەر بنچینەی نووسین",
    url: "https://stability.ai/stable-diffusion",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Adobe Firefly",
    description: "ئامرازە خلاقیەکانی گووگڵ بۆ دروستکردنی وێنە",
    url: "https://www.adobe.com/products/firefly.html",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Leonardo AI",
    description: "دروستکەری هنر AI کە سەرنجامی تایبەتی بۆ داراییە گیمەکان و بەرزکردنەوەی پەیوەندیدارەکان پێشکەش دەکات",
    url: "https://leonardo.ai",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Artbreeder",
    description: "پلاتفۆرمی دروستکردنی هنر AI بەکاربردنی ئیشکراوی جینی",
    url: "https://www.artbreeder.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "RunwayML",
    description: "پەکەوتەری خلاقی AI بۆ هنرمەندان و دیزاینەرەکان",
    url: "https://runwayml.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Canva AI",
    description: "ئامرازە خلاقیەکانی AI لە ناو پلاتفۆرمی Canva",
    url: "https://www.canva.com/ai-image-generator/",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Jasper",
    description: "یارمەتیدەری نووسینی AI بۆ کۆپی مارکێتینگ و دروستکردنی محتوا",
    url: "https://www.jasper.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Copy.ai",
    description: "ئامرازە نووسینی AI بۆ کۆپی مارکێتینگ و فروشتن",
    url: "https://www.copy.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Writesonic",
    description: "پلاتفۆرمی نووسینی AI بۆ مەقالەکان، ئیشکراوەکان، و کۆپی مارکێتینگ",
    url: "https://writesonic.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Grammarly",
    description: "یارمەتیدەری نووسینی AI بۆ باشترکردنی ئیشکراو و شێوەنووسی",
    url: "https://www.grammarly.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Notion AI",
    description: "یارمەتیدەری نووسینی AI کە لە ناو چەندین کارەبا کەرتەکراوە",
    url: "https://www.notion.so/product/ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Quillbot",
    description: "ئامرازە نووسینی AI بۆ گۆڕینی و نووسینی نوێ بۆ باشترکردنی محتوا",
    url: "https://quillbot.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Sudowrite",
    description: "هەموو شتێک بۆ نووسینی خەیاڵی و چیرۆکی نووسینی AI",
    url: "https://www.sudowrite.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "GitHub Copilot",
    description: "یارمەتیدەری نووسینی کۆد بەرەوپێشکەوتوو کە یارمەتیدەری نووسینی کۆد و کۆمپلێتی کۆد دەکات",
    url: "https://github.com/features/copilot",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Tabnine",
    description: "ئامرازە کۆمپلێتی کۆد کە لەگەڵ چەندین IDE کار دەکات",
    url: "https://www.tabnine.com",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Replit Ghostwriter",
    description: "پروگرامەری پەیوەندیدار کە لەگەڵ IDEی Replit پەیوەندیدارە",
    url: "https://replit.com/site/ghostwriter",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Cursor",
    description: "دەستنووسی پەیوەندیدار بەرزکراو بۆ نووسینی کۆد لەگەڵ AI",
    url: "https://cursor.sh",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "CodeT5",
    description: "مۆدێلی AI بۆ تێگەیشتنی کۆد و دروستکردنی کۆد",
    url: "https://github.com/salesforce/CodeT5",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Amazon CodeWhisperer",
    description: "یارمەتیدەری کۆدی AIی ئامازۆن بۆ چەندین زمانە پڕۆگرامییەکان",
    url: "https://aws.amazon.com/codewhisperer/",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Runway Gen-2",
    description: "دروستکردنی ویدیو لەسەر بنچینەی نووسین و وێنەکان",
    url: "https://runwayml.com/ai-magic-tools/gen-2/",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Synthesia",
    description: "پلاتفۆرمی دروستکردنی ویدیو لەگەڵ پێشکەشکەرانە ڕەقەبەندە",
    url: "https://www.synthesia.io",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Lumen5",
    description: "دروستکردنی ویدیو بەرەوپێشکەوتوو بۆ ناوەڕۆکی میدیای کۆمەڵایەتی",
    url: "https://lumen5.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Pictory",
    description: "دروستکردنی ویدیو و ویرایشکردن لەسەر بنچینەی ناوەڕۆکی نووسراو",
    url: "https://pictory.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "InVideo",
    description: "پلاتفۆرمی دروستکردنی ویدیو لەگەڵ شێوەکان و ئیشکراوی ئیشکراوە",
    url: "https://invideo.io",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Fliki",
    description: "گۆڕینی نووسەکان بۆ ویدیوەکان لەگەڵ دەنگەکان و وێنەکان",
    url: "https://fliki.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Mubert",
    description: "دروستکردنی موزیک بەرەوپێشکەوتوو بۆ دروستکردنی ناوەڕۆکەکان و پەرەسەندەکان",
    url: "https://mubert.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "AIVA",
    description: "دروستکردنی موزیکە نوێنەرەکان بەرەوپێشکەوتوو",
    url: "https://www.aiva.ai",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Boomy",
    description: "پلاتفۆرمی دروستکردنی موزیک بۆ دروستکردنی گۆرانییەکان",
    url: "https://boomy.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Soundraw",
    description: "دروستکردنی موزیک بەرەوپێشکەوتوو بۆ دروستکردنی ناوەڕۆکەکان",
    url: "https://soundraw.io",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Eleven Labs",
    description: "تکنەلۆژیاى سینتسەی ئیشکراوی دەنگ و کلاونکردن",
    url: "https://elevenlabs.io",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Speechify",
    description: "تبدیل نووسە بۆ دەنگە طبیعیەکان بە شێوەی سینتسەی ئیشکراوی",
    url: "https://speechify.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Descript",
    description: "ویرایشکردنی ئیشکراوی و ویدیو بە شێوەی سینتسەی ئیشکراوی",
    url: "https://www.descript.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Monday.com AI",
    description: "بەرەوپێشکەوتنی پڕۆژە و ئیشکراوی فلووەری بەرەوپێشکەوتوو",
    url: "https://monday.com/ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Otter.ai",
    description: "یارمەتیدەری کۆمەڵەیەکی AI کە وەرگرتنی نووسین و تۆمارکردن",
    url: "https://otter.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Zapier AI",
    description: "ئامرازە بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ پەیوەندیدانی ئەپەکان و فلووەری",
    url: "https://zapier.com/ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Calendly AI",
    description: "یارمەتیدەری پەیوەندیدانی کات بەرەوپێشکەوتوو بۆ باشترکردنی کۆبوونەوەکان",
    url: "https://calendly.com/ai-scheduling",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Salesforce Einstein",
    description: "فەرمیسکەی CRMی بەرەوپێشکەوتوو بۆ فروشتن و مارکێتینگ",
    url: "https://www.salesforce.com/products/einstein/",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "HubSpot AI",
    description: "ئامرازە AI بۆ مارکێتینگ، فروشتن، و خزمەتگوزارییە کڕیارەکان",
    url: "https://www.hubspot.com/artificial-intelligence",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Tableau AI",
    description: "فەرمیسکەی بینینی داتا و ئیشکراوی بەرەوپێشکەوتوو",
    url: "https://www.tableau.com/products/tableau-ai",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "DataRobot",
    description: "پلاتفۆرمی AI بەرەوپێشکەوتوو بۆ فەرمیسکەی ئیشکراوی ماشین",
    url: "https://www.datarobot.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "H2O.ai",
    description: "پلاتفۆرمی AI و فەرمیسکەی ماشین لەسەر بنچینەی ئازاد",
    url: "https://h2o.ai",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "MonkeyLearn",
    description: "پلاتفۆرمی تاقی کردنەوەی نوسین و پەیوەندیدانی AI",
    url: "https://monkeylearn.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Scale AI",
    description: "مەکۆی داتا بۆ AI بەکاربردنی نیشانی و تێبینی",
    url: "https://scale.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Figma AI",
    description: "فەرمیسکەی نووسینی فەرمیسکەی فێرکاری بەرەوپێشکەوتوو",
    url: "https://www.figma.com/ai/",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Uizard",
    description: "ئامرازە دیزاینی بەرەوپێشکەوتوو بۆ پەروەردەی خێرا",
    url: "https://uizard.io",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Looka",
    description: "پلاتفۆرمی دیزاین لوگو و نیشانی مارکە بەرەوپێشکەوتوو",
    url: "https://looka.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Remove.bg",
    description: "ئامرازە لەسەر بنچینەی وێنە بەرەوپێشکەوتوو بۆ لابردنی پسپۆڕ",
    url: "https://www.remove.bg",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Khroma",
    description: "دروستکردنی پالتەی رنگ بەرەوپێشکەوتوو بۆ دیزاینەرەکان",
    url: "http://khroma.co",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "DeepL",
    description: "خزمەتی وەرگرتنی نووسین بەرەوپێشکەوتوو بە دقتی بەرز",
    url: "https://www.deepl.com",
    category: "زمان",
    source: "دەستی"
  },
  {
    name: "Google Translate",
    description: "خزمەتی وەرگرتنی نووسین بەرەوپێشکەوتوو بەرەوپێشکەوتوو بۆ ١٠٠+ زمان",
    url: "https://translate.google.com",
    category: "زمان",
    source: "دەستی"
  },
  {
    name: "Reverso",
    description: "وەرگرتنی نووسین بەرەوپێشکەوتوو بە شێوەی پەیوەندیدار و تایبەتمەندیەکان",
    url: "https://www.reverso.net",
    category: "زمان",
    source: "دەستی"
  },
  {
    name: "Surfer SEO",
    description: "بەرەوپێشکەوتنی SEO بەرەوپێشکەوتوو و پلانی ناوەڕۆک",
    url: "https://surferseo.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "MarketMuse",
    description: "پلاتفۆرمی پلانی ناوەڕۆک و بەرەوپێشکەوتنی SEO بەرەوپێشکەوتوو",
    url: "https://www.marketmuse.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Persado",
    description: "پلاتفۆرمی بەرەوپێشکەوتنی زمان بەرەوپێشکەوتوو بۆ مارکێتینگ",
    url: "https://www.persado.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "MyFitnessPal AI",
    description: "پەیوەندیدانی تایبەتی بەرەوپێشکەوتوو بۆ چاوپێکەوتنی خۆراک و پلانی خواردن",
    url: "https://www.myfitnesspal.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Ada Health",
    description: "پشکنینی تندرستی و نیشانی نیشانی بەرەوپێشکەوتوو",
    url: "https://ada.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Mint AI",
    description: "بەرەوپێشکەوتنی تایبەتی بەرەوپێشکەوتوو بۆ بەڕێوەبردنی دارایی",
    url: "https://mint.intuit.com",
    category: "دارایی",
    source: "دەستی"
  },
  {
    name: "Robo-advisors",
    description: "پلاتفۆرمی بەرەوپێشکەوتنی دارایی بەرەوپێشکەوتوو",
    url: "https://www.betterment.com",
    category: "دارایی",
    source: "دەستی"
  },
  {
    name: "Khan Academy AI",
    description: "پلاتفۆرمی فێرکاری بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    url: "https://www.khanacademy.org",
    category: "فێرکاری",
    source: "دەستی"
  },
  {
    name: "Duolingo",
    description: "پلاتفۆرمی فێرکاری زمان بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    url: "https://www.duolingo.com",
    category: "فێرکاری",
    source: "دەستی"
  },
  {
    name: "Coursera AI",
    description: "فێرکاری بەرەوپێشکەوتوو و پێشنیازی کۆرسەکان بەرەوپێشکەوتوو",
    url: "https://www.coursera.org",
    category: "فێرکاری",
    source: "دەستی"
  },
  {
    name: "Replika",
    description: "یارمەتیدەری AI بۆ گفتوگۆی مەعنیدار و پشتیوانی عەقلی",
    url: "https://replika.ai",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Chai",
    description: "پلاتفۆرمی گفتوگۆی لەگەڵ کردارەکانی AI و شەخصیەتیەکان",
    url: "https://chai.ml",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Crushon.AI",
    description: "پلاتفۆرمی گفتوگۆی کردارەکان بێ سنووردار",
    url: "https://crushon.ai",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Janitor AI",
    description: "پلاتفۆرمی چات‌باتی AI کە کردارەکانەوەی پێشکەش دەکات",
    url: "https://janitorai.com",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "SpicyChat",
    description: "پلاتفۆرمی چات‌باتی رۆڵپەلی AI",
    url: "https://spicychat.ai",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Poe by Quora",
    description: "گوازرانی چەندین چات‌باتی AI لە یەک پلاتفۆرم",
    url: "https://poe.com",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Chatsonic",
    description: "جێگرەوەی ChatGPT کە بە زانیارییە نوێکان پەیوەندیدارە",
    url: "https://writesonic.com/chat",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "YouChat",
    description: "یارمەتیدەری گەڕانی AI بە شێوەی گفتوگۆیی",
    url: "https://you.com/search?q=&tbm=youchat",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Bing Chat",
    description: "تجربەی گەڕانی و چاتکردنی AIی مایکروسوفت",
    url: "https://www.bing.com/chat",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Kuki AI",
    description: "چات‌باتی AIی بەرزەخەری بۆ ئیشکراو",
    url: "https://www.kuki.ai",
    category: "Chatbot",
    source: "دەستی"
  },
  {
    name: "Playground AI",
    description: "دروستکردنی وێنەی AIیەکی بەردەست لەگەڵ چەندین مۆدێل",
    url: "https://playgroundai.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "NightCafe",
    description: "دروستکردنی هنر AI بە شێوەی چەندین ئیگورە",
    url: "https://nightcafe.studio",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Dream by Wombo",
    description: "بەرنامەی دروستکردنی هنر AI بۆ مۆبایل",
    url: "https://dream.ai",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Craiyon",
    description: "دروستکردنی وێنەی AI (پێشتر DALL-E mini)",
    url: "https://www.craiyon.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "DeepAI",
    description: "چندین ئامرازە AI بەرەوپێشکەوتوو لەگەڵ دروستکردنی وێنە",
    url: "https://deepai.org",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "StarryAI",
    description: "بەرنامەی دروستکردنی هنر AI بۆ ئیشکراوی مۆبایل",
    url: "https://starryai.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Photosonic",
    description: "دروستکردنی وێنەی AI بەرەوپێشکەوتوو لەگەڵ Writesonic",
    url: "https://photosonic.writesonic.com",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Bing Image Creator",
    description: "ئامرازە دروستکردنی وێنەی AIی مایکروسوفت",
    url: "https://www.bing.com/images/create",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "BlueWillow",
    description: "دروستکردنی ئەمادەی وێنەی AI بەرەوپێشکەوتوو",
    url: "https://www.bluewillow.ai",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "WOMBO Dream",
    description: "بەرنامەی دروستکردنی ئەمادەی وێنەی بەرەوپێشکەوتوو",
    url: "https://www.wombo.art",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Pixai",
    description: "دروستکردنی هنر AI بەرەوپێشکەوتوو بەرزەخەری بۆ ئیشکراوی مۆبایل",
    url: "https://pixai.art",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Lexica",
    description: "مەکۆی گەڕانی Stable Diffusion و دروستکردنی وێنە",
    url: "https://lexica.art",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "DreamStudio",
    description: "رەسمییەتی Stable Diffusion لە لایەن Stability AI",
    url: "https://beta.dreamstudio.ai",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Imagine",
    description: "دروستکردنی هنر AI بە شێوەی چەندین شێوە",
    url: "https://imagine.art",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Hotpot.ai",
    description: "دروستکردنی هنر AI و ویرایشکردنی وێنە",
    url: "https://hotpot.ai",
    category: "وێنە",
    source: "دەستی"
  },
  {
    name: "Rytr",
    description: "یارمەتیدەری نووسینی AI بۆ جۆرە جۆری ناوەڕۆکەکان",
    url: "https://rytr.me",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Anyword",
    description: "پلاتفۆرمی نووسینی کۆپی بەرەوپێشکەوتوو بۆ مارکێتەرەکان",
    url: "https://anyword.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Shortly AI",
    description: "یارمەتیدەری نووسینی بەرەوپێشکەوتوو بۆ ناوەڕۆکی درێژ",
    url: "https://shortlyai.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Peppertype",
    description: "دروستکردنی ناوەڕۆک بەرەوپێشکەوتوو بۆ مارکێتینگ",
    url: "https://www.peppertype.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "ContentBot",
    description: "پلاتفۆرمی دروستکردنی ناوەڕۆک بەرەوپێشکەوتوو",
    url: "https://contentbot.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "CopySmith",
    description: "نووسینی کۆپی بەرەوپێشکەوتوو بۆ ئیشکراوی کۆمەرەس و مارکێتینگ",
    url: "https://copysmith.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Simplified",
    description: "پلاتفۆرمی هەموو لە یەک بۆ دیزاین و دروستکردنی ناوەڕۆک",
    url: "https://simplified.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Lyne.ai",
    description: "پەیوەندیدانی خۆشەویستی بەرەوپێشکەوتوو بۆ ئیمەیڵە ساردەمیەکان",
    url: "https://www.lyne.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Hypotenuse AI",
    description: "دروستکردنی ناوەڕۆکی بەرەوپێشکەوتوو بۆ کۆمەرەس",
    url: "https://hypotenuse.ai",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Closers Copy",
    description: "نووسینی کۆپی بەرەوپێشکەوتوو بۆ فروشتن و مارکێتینگ",
    url: "https://www.closerscopy.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Neuroflash",
    description: "دروستکردنی نووسین و وێنە بەرەوپێشکەوتوو",
    url: "https://neuroflash.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "AI-Writer",
    description: "نووسینی مەقالەی AI بە سەرچاوە",
    url: "https://ai-writer.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Article Forge",
    description: "دروستکردنی ناوەڕۆکی SEO بەرەوپێشکەوتوو",
    url: "https://www.articleforge.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "Wordtune",
    description: "یارمەتیدەری نووسینی بەرەوپێشکەوتوو بۆ نووسینی نوێ و ویرایشکردن",
    url: "https://www.wordtune.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "ProWritingAid",
    description: "یارمەتیدەری نووسینی AI بەرەوپێشکەوتوو و ویرایشکردن",
    url: "https://prowritingaid.com",
    category: "نووسین",
    source: "دەستی"
  },
  {
    name: "D-ID",
    description: "دروستکردنی ویدیو لەگەڵ پەیامەکانى قسەکردن",
    url: "https://www.d-id.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Elai.io",
    description: "دروستکردنی ویدیو لەگەڵ پێشکەشکەرانە ڕەقەبەندە",
    url: "https://elai.io",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Hour One",
    description: "پلاتفۆرمی دروستکردنی ویدیو بەرەوپێشکەوتوو",
    url: "https://hourone.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Colossyan",
    description: "دروستکردنی ویدیو لەگەڵ پەیامەکانى ڕەقەبەندە",
    url: "https://www.colossyan.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Rephrase.ai",
    description: "دروستکردنی ویدیو بەرەوپێشکەوتوو بۆ تایبەتی",
    url: "https://www.rephrase.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Movio",
    description: "دروستکردنی ویدیو بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    url: "https://www.movio.la",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Yepic AI",
    description: "پلاتفۆرمی دروستکردنی ویدیو بەرەوپێشکەوتوو",
    url: "https://www.yepic.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Steve AI",
    description: "دروستکردنی ویدیو بەرەوپێشکەوتوو بۆ میدیای کۆمەڵایەتی",
    url: "https://www.steve.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Murf",
    description: "دروستکردنی دەنگ بەرەوپێشکەوتوو بۆ ویدیوەکان",
    url: "https://murf.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Kapwing",
    description: "وێنەیەکی آنلاین بەرەوپێشکەوتوو لەگەڵ فێچەرەکانی AI",
    url: "https://www.kapwing.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Raw Shorts",
    description: "دروستکردنی ویدیو بەرەوپێشکەوتوو بۆ کەسبواری",
    url: "https://www.rawshorts.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Designs.ai",
    description: "دروستکردنی دیزاین و ویدیو بەرەوپێشکەوتوو",
    url: "https://designs.ai",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Animoto",
    description: "پلاتفۆرمی دروستکردنی ویدیو بەرەوپێشکەوتوو لەگەڵ فێچەرەکانی AI",
    url: "https://animoto.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Wave.video",
    description: "وێنەیەکی آنلاین بەرەوپێشکەوتوو لەگەڵ ئامرازەکانی AI",
    url: "https://wave.video",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Biteable",
    description: "وێنەیەکی سادە بەرەوپێشکەوتوو لەگەڵ شێوەکان",
    url: "https://biteable.com",
    category: "ویدیو",
    source: "دەستی"
  },
  {
    name: "Jukebox",
    description: "تۆپەی شەوەییەکان بەرەوپێشکەوتوو بۆ دروستکردنی موزیک",
    url: "https://openai.com/blog/jukebox/",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Amper Music",
    description: "پلاتفۆرمی هەریمە موزیک بەرەوپێشکەوتوو",
    url: "https://www.ampermusic.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Endel",
    description: "موزیکی بەرەوپێشکەوتوو بەرەوپێشکەوتوو بۆ پەیوەندیدانی",
    url: "https://endel.io",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Brain.fm",
    description: "موزیکی بەرەوپێشکەوتوو بەرەوپێشکەوتوو بۆ بەرزکردنەوەی کارایی",
    url: "https://www.brain.fm",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Lalal.ai",
    description: "جیاکردنەوەی دەنگ و ئیشکراوی بەرەوپێشکەوتوو",
    url: "https://www.lalal.ai",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "LANDR",
    description: "خزمەتی بەرەوپێشکەوتنی موزیک",
    url: "https://www.landr.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "eMastered",
    description: "پلاتفۆرمی بەرەوپێشکەوتنی ئیشکراوی",
    url: "https://emastered.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Wavtool",
    description: "دروستکردنی بەرەوپێشکەوتنی موزیک لە بەرەوپێشکەوتوو",
    url: "https://wavtool.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Beatoven.ai",
    description: "دروستکردنی موزیک بەرەوپێشکەوتوو بۆ دروستکردنی ناوەڕۆکەکان",
    url: "https://www.beatoven.ai",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Ecrett Music",
    description: "دروستکردنی موزیک بەرەوپێشکەوتوو بۆ ویدیوەکان",
    url: "https://ecrettmusic.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Humtap",
    description: "بەرنامەی دروستکردنی موزیک بەرەوپێشکەوتوو",
    url: "https://www.humtap.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Orb Producer",
    description: "پلاگینی AI بۆ دروستکردنی موزیک",
    url: "https://www.orbproducer.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Samplette",
    description: "دروستکردنی نمونە بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    url: "https://samplette.io",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Splash",
    description: "پلاتفۆرمی موزیک بەرەوپێشکەوتوو",
    url: "https://www.splashmusic.com",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Veed.io",
    description: "وێنەیەکی آنلاین بەرەوپێشکەوتوو لەگەڵ ئامرازەکانی ئیشکراوی",
    url: "https://www.veed.io",
    category: "ئاوایی",
    source: "دەستی"
  },
  {
    name: "Motion",
    description: "بەرەوپێشکەوتنی پڕۆژە و کەلەندەر بەرەوپێشکەوتوو",
    url: "https://www.usemotion.com",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Clockify AI",
    description: "بەرەوپێشکەوتنی کاتژمێر و زانیارییەکانی کارایی",
    url: "https://clockify.me",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Reclaim.ai",
    description: "یارمەتیدەری کەلەندەر بەرەوپێشکەوتوو بۆ کات بلاککردن",
    url: "https://reclaim.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Fireflies.ai",
    description: "یارمەتیدەری کۆمەڵەیەکی AI و وەرگرتنی نووسین",
    url: "https://fireflies.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Fathom",
    description: "تێبینی نووسین بەرەوپێشکەوتوو بۆ کۆنگرەی ویدیو",
    url: "https://fathom.video",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Krisp",
    description: "لایەنگرانی دەنگ بەرەوپێشکەوتوو بۆ تماسی",
    url: "https://krisp.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Clara",
    description: "یارمەتیدەری کەلەندەر بەرەوپێشکەوتوو",
    url: "https://claralabs.com",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "X.ai",
    description: "یارمەتیدەری تایبەتی بەرەوپێشکەوتوو بۆ کەلەندەر",
    url: "https://x.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Tome",
    description: "دروستکردنی پێشکەشنامە بەرەوپێشکەوتوو",
    url: "https://tome.app",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Beautiful.AI",
    description: "پلاتفۆرمی دیزاین پێشکەشنامە بەرەوپێشکەوتوو",
    url: "https://www.beautiful.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Gamma",
    description: "یارمەتیدەری دروستکردنی پێشکەشنامە بەرەوپێشکەوتوو",
    url: "https://gamma.app",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Pitch",
    description: "نرمەکاڕی پێشکەشنامەی هاوپۆل بەرەوپێشکەوتوو لەگەڵ AI",
    url: "https://pitch.com",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Grain",
    description: "تێبینی گفتوگۆ بەرەوپێشکەوتوو بۆ فروشتن",
    url: "https://grain.co",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Gong",
    description: "پلاتفۆرمی زانیاری بەرەوپێشکەوتنی دارایی",
    url: "https://www.gong.io",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Chorus",
    description: "تێبینی گفتوگۆ بەرەوپێشکەوتوو",
    url: "https://www.chorus.ai",
    category: "کسب و کار",
    source: "دەستی"
  },
  {
    name: "Galileo AI",
    description: "دیزاینی UI بەرەوپێشکەوتوو لە بنچینەی نووسین",
    url: "https://www.usegalileo.ai",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Framer AI",
    description: "بەرنامەی دروستکردنی وێب و دیزاین بەرەوپێشکەوتوو",
    url: "https://www.framer.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Magician",
    description: "ئامرازە دیزاینی بۆ Figma",
    url: "https://magician.design",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Diagram",
    description: "ئامرازە دیزاینی بەرەوپێشکەوتوو",
    url: "https://diagram.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Brandmark",
    description: "دروستکردنی دیزاین لوگو بەرەوپێشکەوتوو",
    url: "https://brandmark.io",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Logoai",
    description: "دروستکردنی لوگو بەرەوپێشکەوتوو",
    url: "https://www.logoai.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Designs.ai DesignMaker",
    description: "ئامرازە دیزاینی گرافیکی بەرەوپێشکەوتوو",
    url: "https://designs.ai/designmaker",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Booth.ai",
    description: "فوتۆگرافی بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    url: "https://www.booth.ai",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Flair.ai",
    description: "ئامرازە فوتۆگرافی بەرەوپێشکەوتوو",
    url: "https://flair.ai",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Mokker",
    description: "جیاکردنەوەی پسپۆڕ بەرەوپێشکەوتوو بۆ مەحصولات",
    url: "https://mokker.ai",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Autodraw",
    description: "یارمەتیدەری ڕەسمی گووگڵ بەرەوپێشکەوتوو",
    url: "https://www.autodraw.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Sketch2Code",
    description: "گواستنەوەی ڕەسم بۆ HTML بەرەوپێشکەوتوو لە لایەن مایکروسوفت",
    url: "https://sketch2code.azurewebsites.net",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Zecoda",
    description: "دروستکردنی کۆد لەسەر بنچینەی دیزاین",
    url: "https://zecoda.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Teleport HQ",
    description: "بەرنامەی دروستکردنی وێب",
    url: "https://teleporthq.io",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Figstack",
    description: "تێبینی کۆد و بەرزکردنەوەی پەیوەندیدار",
    url: "https://www.figstack.com",
    category: "دیزاین",
    source: "دەستی"
  },
  {
    name: "Codeium",
    description: "ئامرازە کۆمپلێتی کۆد بەرەوپێشکەوتوو",
    url: "https://codeium.com",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Kite",
    description: "یارمەتیدەری نووسینی کۆد (ئێستا بەشێوەیەکی تایبەتی لە Replit)",
    url: "https://www.kite.com",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "IntelliCode",
    description: "پیشکەشکردنی پەرەسەندەی مایکروسوفت بەرەوپێشکەوتوو",
    url: "https://visualstudio.microsoft.com/services/intellicode/",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "CodeGuru",
    description: "یارمەتیدەری تاقیکردنەوەی کۆدی ئامازۆن",
    url: "https://aws.amazon.com/codeguru/",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "DeepCode",
    description: "پلاتفۆرمی تاقیکردنەوەی کۆد بەرەوپێشکەوتوو",
    url: "https://www.deepcode.ai",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Sourcery",
    description: "ئامرازە تاقیکردنەوەی کۆد بەرەوپێشکەوتوو بۆ پایتن",
    url: "https://sourcery.ai",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Codacy",
    description: "پلاتفۆرمی تاقیکردنەوەی ئیشکراوی کۆد",
    url: "https://www.codacy.com",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Polycoder",
    description: "دروستکردنی کۆدی AIی ئازاد",
    url: "https://github.com/VHellendoorn/Code-LMs",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Aider",
    description: "پەیوەندیداری پەیوەندیدار لە ترمینالەکەت",
    url: "https://aider.chat",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Continue",
    description: "یارمەتیدەری کۆدی AIی ئازاد",
    url: "https://continue.dev",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Blackbox AI",
    description: "یارمەتیدەری نووسینی کۆد",
    url: "https://www.blackbox.ai",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Mintlify",
    description: "دروستکردنی بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    url: "https://mintlify.com",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Whisk",
    description: "گەڕانی کۆد و تێبینی بەرەوپێشکەوتوو",
    url: "https://whisk.apache.org",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Mutable.ai",
    description: "پەرەسەندنی بەرەوپێشکەوتنی نرمەزاڵەکان",
    url: "https://mutable.ai",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Stenography",
    description: "تێبینی نووسینی کۆد بەرەوپێشکەوتوو",
    url: "https://stenography.dev",
    category: "کۆد",
    source: "دەستی"
  },
  {
    name: "Frase",
    description: "بەرەوپێشکەوتنی ناوەڕۆک بۆ SEO",
    url: "https://www.frase.io",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "BrightEdge",
    description: "پلاتفۆرمی SEOی بەرەوپێشکەوتوو",
    url: "https://www.brightedge.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Clearscope",
    description: "پلاتفۆرمی بەرەوپێشکەوتنی ناوەڕۆک",
    url: "https://www.clearscope.io",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "SEMrush AI",
    description: "فێچەرەکانی AI لە پلاتفۆرمی SEMrush",
    url: "https://www.semrush.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Ahrefs AI",
    description: "زانیارییەکانی SEOی بەرەوپێشکەوتوو",
    url: "https://ahrefs.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Conductor",
    description: "بەرەوپێشکەوتنی ناوەڕۆک بەرەوپێشکەوتوو",
    url: "https://www.conductor.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Yoast AI",
    description: "بەرەوپێشکەوتنی SEO بۆ WordPress",
    url: "https://yoast.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Scalenut",
    description: "پلاتفۆرمی SEO و مارکێتینی ناوەڕۆک بەرەوپێشکەوتوو",
    url: "https://www.scalenut.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Outranking",
    description: "پەکەوتەی بەرەوپێشکەوتنی ناوەڕۆک",
    url: "https://www.outranking.io",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "GrowthBar",
    description: "ئامرازە نووسینی و SEO بەرەوپێشکەوتوو",
    url: "https://www.growthbarseo.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "INK",
    description: "بەرەوپێشکەوتنی ناوەڕۆک و یارمەتیدەری بەرەوپێشکەوتوو",
    url: "https://inkforall.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "ContentKing",
    description: "تاقیکردنەوەی SEO و چاوپێکەوتن",
    url: "https://www.contentkingapp.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Can I Rank",
    description: "نرمەکاڕی SEO بەرەوپێشکەوتوو",
    url: "https://www.canirank.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Page Optimizer Pro",
    description: "بەرەوپێشکەوتنی ناوەڕۆک بۆ SEO",
    url: "https://pageoptimizer.pro",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "NeuronWriter",
    description: "دەستکاریکردنی ناوەڕۆک بەرەوپێشکەوتوو لەگەڵ بەرەوپێشکەوتنی SEO",
    url: "https://www.neuronwriter.com",
    category: "مارکێتینگ",
    source: "دەستی"
  },
  {
    name: "Obviously AI",
    description: "بە شێوەیەکی بێ نووسین بەرەوپێشکەوتنی زانیارییەکان",
    url: "https://www.obviously.ai",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "DataSeer",
    description: "تاقیکردنەوەی داتا و زانیارییەکان بەرەوپێشکەوتوو",
    url: "https://dataseer.ai",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Polymer",
    description: "BI و چاوپێکەوتنی زانیارییەکان بەرەوپێشکەوتوو",
    url: "https://www.polymersearch.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Sisense AI",
    description: "پلاتفۆرمی چاوپێکەوتنی زانیارییەکان",
    url: "https://www.sisense.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "ThoughtSpot",
    description: "پلاتفۆرمی چاوپێکەوتنی زانیارییەکان بەرەوپێشکەوتوو",
    url: "https://www.thoughtspot.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Looker",
    description: "پلاتفۆرمی زانیارییە کە لە لایەن گووگڵەوە",
    url: "https://looker.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Qlik Sense",
    description: "چاوپێکەوتنی زانیارییەکان بەرەوپێشکەوتوو",
    url: "https://www.qlik.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Power BI",
    description: "چاوپێکەوتنی زانیارییەکان بەرەوپێشکەوتوو لە لایەن مایکروسوفت",
    url: "https://powerbi.microsoft.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Alteryx",
    description: "پلاتفۆرمی AI و فەرمیسکەی ماشین",
    url: "https://www.alteryx.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Palantir",
    description: "پلاتفۆرمی زانیارییە کە بەرزەخەری زۆرە",
    url: "https://www.palantir.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Databricks",
    description: "پلاتفۆرمی یەکگرتوو بەرەوپێشکەوتنی زانیارییەکان",
    url: "https://databricks.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Snowflake",
    description: "پلاتفۆرمی داتا لە ئاسمان بەرەوپێشکەوتوو",
    url: "https://www.snowflake.com",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "BigQuery ML",
    description: "فەرمیسکەی ماشین لە BigQueryی گووگڵ",
    url: "https://cloud.google.com/bigquery-ml",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Amazon SageMaker",
    description: "پلاتفۆرمی فەرمیسکەی ماشین لە ئامازۆن",
    url: "https://aws.amazon.com/sagemaker/",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Azure ML",
    description: "خزمەتی MLی مایکروسوفت لە ئازور",
    url: "https://azure.microsoft.com/en-us/services/machine-learning/",
    category: "چاوپێکەوتن",
    source: "دەستی"
  },
  {
    name: "Babylon Health",
    description: "پشکنینی تندرستی و مشاوره بەرەوپێشکەوتنی AI",
    url: "https://www.babylonhealth.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Buoy Health",
    description: "پشکنینی نیشانی و یارمەتیدانی تندرستی بەرەوپێشکەوتوو",
    url: "https://www.buoyhealth.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Infermedica",
    description: "یارمەتیدەری پشکنینی پزیشکی بەرەوپێشکەوتوو",
    url: "https://infermedica.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "K Health",
    description: "پزیشکی تایبەتی بەرەوپێشکەوتوو لەگەڵ AI",
    url: "https://khealth.ai",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Symptomate",
    description: "پشکنینی نیشانی بەرەوپێشکەوتوو",
    url: "https://symptomate.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Healthily",
    description: "پلاتفۆرمی زانیاری تندرستی بەرەوپێشکەوتوو",
    url: "https://www.livehealthily.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Woebot",
    description: "چات‌باتی تندرستی روانی بەرەوپێشکەوتوو",
    url: "https://woebothealth.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Wysa",
    description: "بەرنامەی پشتیوانی تندرستی روانی بەرەوپێشکەوتوو",
    url: "https://www.wysa.io",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Replika Health",
    description: "یارمەتیدەری AI بۆ تندرستی مەعنیدار",
    url: "https://replika.ai",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Calm AI",
    description: "یارمەتیدەری بەرەوپێشکەوتنی چاوپێکەوتنی و پەیوەندیدانی تایبەتی",
    url: "https://www.calm.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Headspace AI",
    description: "یارمەتیدەری چاوپێکەوتنی و پەیوەندیدانی تایبەتی",
    url: "https://www.headspace.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Noom",
    description: "یارمەتیدەری بەرەوپێشکەوتنی کەلوپەلی وزن و چاوپێکەوتنی تندرستی",
    url: "https://www.noom.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Lark Health",
    description: "پلاتفۆرمی یارمەتیدانی تندرستی بەرەوپێشکەوتوو",
    url: "https://www.lark.com",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Fitbod",
    description: "بەرنامەی پلانی تمرین بەرەوپێشکەوتوو",
    url: "https://fitbod.me",
    category: "تندرستی",
    source: "دەستی"
  },
  {
    name: "Vi Trainer",
    description: "یارمەتیدەری تایبەتی فیتنەس بەرەوپێشکەوتوو",
    url: "https://www.vitrainer.com",
    category: "تندرستی",
    source: "دەستی"
   },

  {
    "name": "Kavout",
    "description": "پلاتفۆرمی تاقیکردنەوەی بەرەوپێشکەوتنی دارایی",
    "url": "https://www.kavout.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Alphasense",
    "description": "پلاتفۆرمی زانیاری بەرەوپێشکەوتنی بازار",
    "url": "https://www.alpha-sense.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Yodlee",
    "description": "پەیوەندیدانی زانیاری دارایی بەرەوپێشکەوتوو",
    "url": "https://www.yodlee.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Plaid",
    "description": "APIی خزمەتی دارایی لەگەڵ فێچەرەکانی AI",
    "url": "https://plaid.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Zest AI",
    "description": "بەرەوپێشکەوتنی و قەدەغەی پەرەسەندنی دارایی",
    "url": "https://www.zest.ai",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Upstart",
    "description": "پلاتفۆرمی قەرزدانەوەی بەرەوپێشکەوتوو",
    "url": "https://www.upstart.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Affirm",
    "description": "بەرەوپێشکەوتنی کڕینی ئیشکراوی بەرەوپێشکەوتوو",
    "url": "https://www.affirm.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Wealthfront",
    "description": "یارمەتیدەری روبات بەرەوپێشکەوتوو بۆ بەرزکردنەوەی دارایی",
    "url": "https://www.wealthfront.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Personal Capital",
    "description": "پلاتفۆرمی بەرەوپێشکەوتنی دارایی بەرەوپێشکەوتوو",
    "url": "https://www.personalcapital.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Tiller",
    "description": "پەیوەندیدانی تایبەتی بەرەوپێشکەوتوو بۆ پەڕەکانی دارایی",
    "url": "https://www.tillerhq.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "YNAB",
    "description": "تۆمارکردنی بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    "url": "https://www.youneedabudget.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Truebill",
    "description": "بەرەوپێشکەوتنی بەشداریکردن",
    "url": "https://www.truebill.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Cleo",
    "description": "چات‌باتی یارمەتیدەری دارایی",
    "url": "https://meetcleo.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Abe AI",
    "description": "یارمەتیدەری بانکی بەرەوپێشکەوتوو",
    "url": "https://abe.ai",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Socratic",
    "description": "یارمەتیدەری فێرکاری بەرەوپێشکەوتوو",
    "url": "https://socratic.org",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Photomath",
    "description": "چاره‌سەرکردنی کێشەی ریاضی بەرەوپێشکەوتوو",
    "url": "https://photomath.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Wolfram Alpha",
    "description": "مێژووی زانیارییە کۆمپیوتەرییەکان",
    "url": "https://www.wolframalpha.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Gradescope",
    "description": "پلاتفۆرمی نیشانی تاقیکردنەوەی نووسین",
    "url": "https://www.gradescope.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Cognii",
    "description": "یارمەتیدەری فێرکاری و تاقیکردنەوە",
    "url": "https://www.cognii.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Century Tech",
    "description": "پلاتفۆرمی فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.century.tech",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Squirrel AI",
    "description": "سیستەمی فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.squirrelai.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Carnegie Learning",
    "description": "نرمەکاڕی فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.carnegielearning.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Knewton",
    "description": "تکنەلۆژیاى فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.knewton.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Aleks",
    "description": "پلاتفۆرمی تاقیکردنەوە و فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.aleks.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Smart Sparrow",
    "description": "پلاتفۆرمی فێرکاری بەرەوپێشکەوتوو",
    "url": "https://www.smartsparrow.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Thinkster Math",
    "description": "بەرنامەی فێرکاری ریاضی بەرەوپێشکەوتوو",
    "url": "https://hellothinkster.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Brainly",
    "description": "کۆمەڵەی یارمەتیدانی فێرکاری بەرەوپێشکەوتوو",
    "url": "https://brainly.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Chegg",
    "description": "پلاتفۆرمی یارمەتیدانی خوێندنی بەرەوپێشکەوتوو",
    "url": "https://www.chegg.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "Quizlet",
    "description": "ئامرازە فێرکارییە کۆمەڵایەتی بەرەوپێشکەوتوو",
    "url": "https://quizlet.com",
    "category": "فێرکاری",
    "source": "دەستی"
  },
  {
    "name": "iTranslate",
    "description": "بەرنامەی وەرگرتنی نووسین",
    "url": "https://www.itranslate.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Microsoft Translator",
    "description": "خزمەتی وەرگرتنی نووسین",
    "url": "https://www.microsoft.com/en-us/translator/",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Papago",
    "description": "خزمەتی وەرگرتنی نووسین لە لایەن ناڤەر",
    "url": "https://papago.naver.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Babylon Translator",
    "description": "نرمەکاڕی وەرگرتنی نووسین",
    "url": "https://translation.babylon-software.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Linguee",
    "description": "پەیوەندیدانی وەرگرتنی نووسین",
    "url": "https://www.linguee.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "SYSTRAN",
    "description": "وەرگرتنی نووسین بەرەوپێشکەوتوو",
    "url": "https://www.systran.net",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Unbabel",
    "description": "وەرگرتنی نووسین بەرەوپێشکەوتوو بۆ پشتیوانی کڕیار",
    "url": "https://unbabel.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Lilt",
    "description": "وەرگرتنی نووسین بەرەوپێشکەوتوو بۆ کۆمپانیەکان",
    "url": "https://lilt.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "ModernMT",
    "description": "وەرگرتنی نووسین بە شێوەی گەورە",
    "url": "https://www.modernmt.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Translated",
    "description": "خزمەتی وەرگرتنی نووسین بەرەوپێشکەوتوو",
    "url": "https://translated.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Smartling",
    "description": "بەرەوپێشکەوتنی بە شێوەیەکی بەرز",
    "url": "https://www.smartling.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Lokalise",
    "description": "بەرەوپێشکەوتنی بە شێوەیەکی تایبەتی",
    "url": "https://lokalise.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Phrase",
    "description": "پلاتفۆرمی ڕووبەڕووبەوەی بەرەوپێشکەوتوو",
    "url": "https://phrase.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Crowdin",
    "description": "بەرەوپێشکەوتنی بە شێوەیەکی تایبەتی",
    "url": "https://crowdin.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Weglot",
    "description": "وەرگرتنی وێبگەڕانی بەرەوپێشکەوتوو",
    "url": "https://weglot.com",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Hootsuite AI",
    "description": "بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ بەرهەمهێنانی میدیای کۆمەڵایەتی",
    "url": "https://hootsuite.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Buffer AI",
    "description": "بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ پلانی میدیای کۆمەڵایەتی",
    "url": "https://buffer.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Sprout Social",
    "description": "تاقیکردنەوەی میدیای کۆمەڵایەتی بەرەوپێشکەوتوو",
    "url": "https://sproutsocial.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Later",
    "description": "بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ پلانی میدیای کۆمەڵایەتی",
    "url": "https://later.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Socialbee",
    "description": "پەیوەندیدانی ناوەڕۆک بەرەوپێشکەوتوو بۆ میدیای کۆمەڵایەتی",
    "url": "https://socialbee.io",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "MeetEdgar",
    "description": "ئامرازە ئیشکراوی بەرەوپێشکەوتوو بۆ میدیای کۆمەڵایەتی",
    "url": "https://meetedgar.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "CoSchedule",
    "description": "کالەندەری مارکێتینگ بەرەوپێشکەوتوو",
    "url": "https://coschedule.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Lately",
    "description": "دروستکردنی ناوەڕۆکی میدیای کۆمەڵایەتی بەرەوپێشکەوتوو",
    "url": "https://www.lately.ai",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Flick",
    "description": "دروستکردنی هەشتاگ و وەسف بەرەوپێشکەوتوو",
    "url": "https://flick.social",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Predis.ai",
    "description": "دروستکردنی ناوەڕۆکی میدیای کۆمەڵایەتی بەرەوپێشکەوتوو",
    "url": "https://predis.ai",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Ocoya",
    "description": "بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ میدیای کۆمەڵایەتی",
    "url": "https://www.ocoya.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Postwise",
    "description": "دروستکردنی تردی تویت بەرەوپێشکەوتوو",
    "url": "https://postwise.ai",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Tweet Hunter",
    "description": "ئامرازە کۆنترۆڵکردنی ناوەڕۆکی تویت بەرەوپێشکەوتوو",
    "url": "https://tweethunter.io",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Hypefury",
    "description": "ئامرازە بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ گەشەپێدانی میدیای کۆمەڵایەتی",
    "url": "https://hypefury.com",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "ContentStudio",
    "description": "پلانکردنی میدیای کۆمەڵایەتی بەرەوپێشکەوتوو",
    "url": "https://contentstudio.io",
    "category": "میدیای کۆمەڵایەتی",
    "source": "دەستی"
  },
  {
    "name": "Dynamic Yield",
    "description": "بەرەوپێشکەوتنی تایبەتی بەرەوپێشکەوتوو بۆ کۆمەرەس",
    "url": "https://www.dynamicyield.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Yotpo",
    "description": "پلاتفۆرمی مارکێتینی کۆمەرەس بەرەوپێشکەوتوو",
    "url": "https://www.yotpo.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Klaviyo",
    "description": "مارکێتینی ئیمەیڵ بەرەوپێشکەوتوو بۆ کۆمەرەس",
    "url": "https://www.klaviyo.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Algolia",
    "description": "گەڕانی و دەرکەوتنی بەرەوپێشکەوتوو",
    "url": "https://www.algolia.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Bloomreach",
    "description": "پلاتفۆرمی تێکەڵکردنی بەرەوپێشکەوتنی کۆمەرەس",
    "url": "https://www.bloomreach.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Searchspring",
    "description": "گەڕانی ماڵپەڕ و بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    "url": "https://searchspring.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Nosto",
    "description": "بەرەوپێشکەوتنی تایبەتی بەرەوپێشکەوتوو بۆ کۆمەرەس",
    "url": "https://www.nosto.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Insider",
    "description": "پلاتفۆرمی تجربەی کڕیار بەرەوپێشکەوتوو",
    "url": "https://useinsider.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Segment",
    "description": "پلاتفۆرمی زانیاری کڕیار لەگەڵ فێچەرەکانی AI",
    "url": "https://segment.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Optimizely",
    "description": "پلاتفۆرمی تاقیکردنەوە بەرەوپێشکەوتوو",
    "url": "https://www.optimizely.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "AB Tasty",
    "description": "پلاتفۆرمی تاقیکردنەوە و بەرەوپێشکەوتنی تایبەتی",
    "url": "https://www.abtasty.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "VWO",
    "description": "بەرەوپێشکەوتنی گەیشتنی بەرەوپێشکەوتوو",
    "url": "https://vwo.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Unbounce",
    "description": "بەرەوپێشکەوتنی پەڕەی فرۆشتن",
    "url": "https://unbounce.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Hotjar",
    "description": "تاقیکردنەوەی چەندین زانیاری بەرەوپێشکەوتوو",
    "url": "https://www.hotjar.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "FullStory",
    "description": "چاوپێکەوتنی ئەندازەی دیجیتاڵ بەرەوپێشکەوتوو",
    "url": "https://www.fullstory.com",
    "category": "تێکنەلۆژی",
    "source": "دەستی"
  },
  {
    "name": "Midjourney Alpha",
    "description": "پیشرفته‌ترین دروستکەری وێنەی AI بە شێوەی وێب",
    "url": "https://alpha.midjourney.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Artbreeder Collage",
    "description": "ئامرازە کۆلێژ و کۆمبینی کردنی هنر AI",
    "url": "https://www.artbreeder.com/collage",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Playground v2",
    "description": "دروستکردنی نوێی وێنەی AI",
    "url": "https://playground.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Imagen",
    "description": "مۆدێلی AIی گووگڵ بۆ گەڕانی نووسین بەرەوپێشکەوتوو",
    "url": "https://imagen.research.google",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Parti",
    "description": "مۆدێلی نووسینی بەرەوپێشکەوتوو بەرەوپێشکەوتوو لە لایەن گووگڵ",
    "url": "https://parti.research.google",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Make-A-Scene",
    "description": "دروستکردنی وێنە لەسەر بنچینەی نووسین و شێوەکان",
    "url": "https://makeasc.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "NUWA",
    "description": "دروستکردنی بەرەوپێشکەوتنی بەرەوپێشکەوتوو لە لایەن مایکروسوفت",
    "url": "https://nuwa-infinity.microsoft.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "CogView",
    "description": "دروستکردنی وێنە لەسەر بنچینەی نووسین",
    "url": "https://cogview.aminer.cn",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "VQGAN+CLIP",
    "description": "دروستکردنی وێنە بە شێوەی VQGAN و CLIP",
    "url": "https://github.com/nerdyrodent/VQGAN-CLIP",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "BigGAN",
    "description": "فەرمیسکەی GAN بەرەوپێشکەوتوو بۆ دروستکردنی وێنەی طبیعی",
    "url": "https://artbreeder.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Gen-1",
    "description": "یەکەمی ویدیو AIی Runway",
    "url": "https://research.runwayml.com/gen1",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Phenaki",
    "description": "دروستکردنی ویدیو لەسەر بنچینەی نووسین",
    "url": "https://phenaki.video",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Make-A-Video",
    "description": "دروستکردنی ویدیو لەسەر بنچینەی نووسین",
    "url": "https://makeavideo.studio",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Imagen Video",
    "description": "دروستکردنی ویدیو لەسەر بنچینەی نووسین",
    "url": "https://imagen.research.google/video",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "VideoPoet",
    "description": "مۆدێلی زنجیرەیی زانیاری بەرەوپێشکەوتوو بۆ دروستکردنی ویدیو",
    "url": "https://sites.research.google/videopoet",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Pika Labs",
    "description": "پلاتفۆرمی دروستکردنی ویدیو بەرەوپێشکەوتوو",
    "url": "https://www.pika.art",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Stable Video Diffusion",
    "description": "مۆدێلی دروستکردنی ویدیو لەسەر بنچینەی نووسین",
    "url": "https://stability.ai/stable-video",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "AnimateDiff",
    "description": "پەیوەندیدانی شەخصی بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    "url": "https://animatediff.github.io",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "Zeroscope",
    "description": "مۆدێلی بەرەوپێشکەوتنی ویدیو بەرەوپێشکەوتوو",
    "url": "https://huggingface.co/cerspense/zeroscope_v2_576w",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "LaVie",
    "description": "دروستکردنی ویدیو بە شێوەی بەرز",
    "url": "https://vchitect.github.io/LaVie-project",
    "category": "ویدیو",
    "source": "دەستی"
  },
  {
    "name": "PaLM",
    "description": "مۆدێلی زانیارییە کە لە لایەن گووگڵەوە",
    "url": "https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "LaMDA",
    "description": "مۆدێلی زمان بەرەوپێشکەوتوو بەرەوپێشکەوتوو لە لایەن گووگڵ",
    "url": "https://blog.google/technology/ai/lamda",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Chinchilla",
    "description": "مۆدێلی گەورەی زمان بەرەوپێشکەوتوو لە لایەن DeepMind",
    "url": "https://www.deepmind.com/blog/an-empirical-analysis-of-compute-optimal-large-language-model-training",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Gopher",
    "description": "مۆدێلی زمان بەرەوپێشکەوتوو بەرەوپێشکەوتوو لە لایەن DeepMind",
    "url": "https://www.deepmind.com/blog/language-modelling-at-scale-gopher-ethical-considerations-and-retrieval",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Megatron-Turing NLG",
    "description": "مۆدێلی گەورەی زمان بەرەوپێشکەوتوو لە لایەن NVIDIA و مایکروسوفت",
    "url": "https://developer.nvidia.com/megatron-turing-natural-language-generation",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "GLM",
    "description": "مۆدێلی گشتی زمان لە لایەن Tsinghua و Zhipu AI",
    "url": "https://github.com/THUDM/GLM",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "OPT",
    "description": "مۆدێلی پێشوەختەی Meta",
    "url": "https://opt.alpa.ai",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "BLOOM",
    "description": "مۆدێلی زمانە کۆمەڵایەتییەکان بەرەوپێشکەوتوو لە لایەن BigScience",
    "url": "https://huggingface.co/bigscience/bloom",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "T5",
    "description": "مۆدێلی گووگڵ بۆ گواستنەوەی نووسین بەرەوپێشکەوتوو",
    "url": "https://github.com/google-research/text-to-text-transfer-transformer",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "UL2",
    "description": "فریمەورکی زانیارییە یەکگرتوو بەرەوپێشکەوتوو لە لایەن گووگڵ",
    "url": "https://github.com/google-research/google-research/tree/master/ul2",
    "category": "زمان",
    "source": "دەستی"
  },
  {
    "name": "Einstein Analytics",
    "description": "پلاتفۆرمی زانیارییە بەرەوپێشکەوتوو لە لایەن Salesforce",
    "url": "https://www.salesforce.com/products/einstein/analytics",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "IBM Watson",
    "description": "پلاتفۆرمی AIی IBM بەرەوپێشکەوتوو",
    "url": "https://www.ibm.com/watson",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Azure Cognitive Services",
    "description": "خزمەتی AIی مایکروسوفت بۆ پەرەسەندنی ئەپەکان",
    "url": "https://azure.microsoft.com/en-us/products/cognitive-services",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "AWS AI Services",
    "description": "پەکەوتەی خزمەتی AIی ئامازۆن",
    "url": "https://aws.amazon.com/ai/services",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Google Cloud AI",
    "description": "خزمەتی AI و فەرمیسکەی ماشین لە لایەن گووگڵ",
    "url": "https://cloud.google.com/ai",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Workday AI",
    "description": "بەرەوپێشکەوتنی پەیوەندیدانی کەسایەتی بەرەوپێشکەوتوو",
    "url": "https://www.workday.com/en-us/artificial-intelligence.html",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "ServiceNow AI",
    "description": "AI بۆ بەڕێوەبردنی خزمەتگوزاری IT",
    "url": "https://www.servicenow.com/products/artificial-intelligence.html",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Oracle AI",
    "description": "بەرنامەکانی زانیارییە کە لە لایەن Oracleەوە",
    "url": "https://www.oracle.com/artificial-intelligence",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "SAP AI",
    "description": "بەرنامەکانی زانیارییە کە لە لایەن SAPەوە",
    "url": "https://www.sap.com/products/artificial-intelligence.html",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Cisco AI",
    "description": "بەرەوپێشکەوتنی شێوەیەکی تایبەتی بەرەوپێشکەوتوو",
    "url": "https://www.cisco.com/c/en/us/solutions/artificial-intelligence.html",
    "category": "کسب و کار",
    "source": "دەستی"
  },
  {
    "name": "Jukebox OpenAI",
    "description": "تۆپەی شەوەییەکان کە موزیکەکان لەگەڵ گۆنەکان دروست دەکات",
    "url": "https://openai.com/research/jukebox",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "MuseNet",
    "description": "مۆدێلی شەوەییەکان بەرەوپێشکەوتوو بۆ دروستکردنی موزیک",
    "url": "https://openai.com/research/musenet",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "WaveNet",
    "description": "مۆدێلی شەوەییەکان بەرەوپێشکەوتوو بۆ دروستکردنی ئیشکراوی دەنگ",
    "url": "https://www.deepmind.com/blog/wavenet-a-generative-model-for-raw-audio",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Tacotron",
    "description": "سیستەمی سینتسەی نووسین بۆ گەڕانی دەنگ",
    "url": "https://google.github.io/tacotron",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "MelGAN",
    "description": "شبکەی پەیوەندیدانی بەرەوپێشکەوتوو بۆ دروستکردنی وێنە",
    "url": "https://melgan-neurips.github.io",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Parallel WaveGAN",
    "description": "مۆدێلی بەرەوپێشکەوتنی وێنە بەرەوپێشکەوتوو",
    "url": "https://github.com/kan-bayashi/ParallelWaveGAN",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "FastSpeech",
    "description": "فێرکاری بەرەوپێشکەوتنی نووسین بۆ دەنگ",
    "url": "https://fastspeech.github.io",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Voice Conversion",
    "description": "ئامرازە گۆڕینی دەنگ و کلاونکردن بەرەوپێشکەوتوو",
    "url": "https://github.com/CorentinJ/Real-Time-Voice-Cloning",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "OpenAI Whisper",
    "description": "پەیوەندیدانی دەنگ بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    "url": "https://openai.com/research/whisper",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Wav2Vec",
    "description": "فێرکاری خۆکار بەرەوپێشکەوتنی دەنگ",
    "url": "https://ai.facebook.com/blog/wav2vec-20-learning-the-structure-of-speech-from-raw-audio",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "AlphaFold",
    "description": "پیشبینی شێوەی پەروەردەی پڕۆتین بەرەوپێشکەوتوو",
    "url": "https://alphafold.ebi.ac.uk",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "AlphaTensor",
    "description": "AI بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ دۆزینەوەی ئیشکراوی نوێ",
    "url": "https://www.deepmind.com/blog/discovering-novel-algorithms-with-alphatensor",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "Minerva",
    "description": "AI بەرەوپێشکەوتنی بەرەوپێشکەوتوو بۆ چاره‌سەرکردنی هەندێک کێشە",
    "url": "https://ai.googleblog.com/2022/06/minerva-solving-quantitative-reasoning.html",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "Galactica",
    "description": "مۆدێلی گەورەی زمان بەرەوپێشکەوتوو بەرەوپێشکەوتوو لە لایەن Meta",
    "url": "https://galactica.org",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "Codex",
    "description": "سیستەمی AIی OpenAI کە زمانە طبیعیەکان بۆ کۆد گواستەوە",
    "url": "https://openai.com/blog/openai-codex",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "PaLM-Coder",
    "description": "گواستنەوەی کۆد لەسەر بنچینەی PaLM",
    "url": "https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "InstructPix2Pix",
    "description": "فێرکاری بەرەوپێشکەوتنی ڕوونی بەرەوپێشکەوتوو",
    "url": "https://www.timothybrooks.com/instruct-pix2pix",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "DreamBooth",
    "description": "فین تونیگ بەرەوپێشکەوتنی وێنەی بەرەوپێشکەوتوو",
    "url": "https://dreambooth.github.io",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "ControlNet",
    "description": "زیادکردنی کۆنترۆل بەرەوپێشکەوتنی وێنەی بەرەوپێشکەوتوو",
    "url": "https://github.com/lllyasviel/ControlNet",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "LoRA",
    "description": "پەیوەندیدانی بەرز بەرەوپێشکەوتنی مۆدێل",
    "url": "https://github.com/microsoft/LoRA",
    "category": "علم",
    "source": "دەستی"
  },
  {
    "name": "OpenAI Five",
    "description": "سیستەمی AI کە یاریی Dota 2 دەکات",
    "url": "https://openai.com/research/openai-five",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "AlphaStar",
    "description": "AIی DeepMind بۆ یاریی StarCraft II",
    "url": "https://www.deepmind.com/blog/alphastar-mastering-the-real-time-strategy-game-starcraft-ii",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "MuZero",
    "description": "یارییەکان، گو، شێوە و Atari بەرەوپێشکەوتوو",
    "url": "https://www.deepmind.com/blog/muzero-mastering-go-chess-shogi-and-atari-without-rules",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "AlphaGo",
    "description": "سیستەمی AIی DeepMind بۆ یاریی گو",
    "url": "https://www.deepmind.com/research/highlighted-research/alphago",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Agent57",
    "description": "یەکەمی ئەژەڵی بەرەوپێشکەوتوو بەرەوپێشکەوتوو لە هەموو ٥٧ یاریی Atari",
    "url": "https://www.deepmind.com/blog/agent57-outperforming-the-atari-human-benchmark",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Hide and Seek",
    "description": "ئامرازە بەرەوپێشکەوتنی ئەمەرەکان لە لایەن OpenAI",
    "url": "https://openai.com/research/emergent-tool-use",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Pluribus",
    "description": "AIی فەیسبووک بۆ یاریی پۆکر لە شێوەی شەش کەس",
    "url": "https://ai.facebook.com/blog/pluribus-first-ai-to-beat-pros-in-6-player-poker",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Libratus",
    "description": "AIی CMU بۆ یاریی پۆکر",
    "url": "https://www.cs.cmu.edu/~noamb/papers/17-IJCAI-Libratus.pdf",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "OpenSpiel",
    "description": "فریمەورکی بەرەوپێشکەوتنی پەیوەندیدار لە یارییەکان",
    "url": "https://github.com/deepmind/open_spiel",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Unity ML-Agents",
    "description": "ئامرازە فەرمیسکەی فێرکاری بەرەوپێشکەوتوو لە یەکەمی Unity",
    "url": "https://unity.com/products/machine-learning-agents",
    "category": "یاریی",
    "source": "دەستی"
  },
  {
    "name": "Spot",
    "description": "چوارپەری بەرەوپێشکەوتنی Boston Dynamics",
    "url": "https://www.bostondynamics.com/spot",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "Atlas",
    "description": "ئامرازەی بەرەوپێشکەوتنی Boston Dynamics",
    "url": "https://www.bostondynamics.com/atlas",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "Pepper",
    "description": "چەندین بەرەوپێشکەوتنی SoftBank",
    "url": "https://www.softbankrobotics.com/emea/en/pepper",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "iRobot",
    "description": "چوونەژورەوە و ئیشکراوی بەرەوپێشکەوتوو",
    "url": "https://www.irobot.com",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "Tesla Bot",
    "description": "پروژەی چەندین بەرەوپێشکەوتنی تێسلا",
    "url": "https://www.tesla.com/AI",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "Sanctuary AI",
    "description": "ئامرازە بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    "url": "https://sanctuary.ai",
    "category": "Robotics",
    "source": "دەستی"
  },
  {
    "name": "Figure AI",
    "description": "ئامرازە بەرەوپێشکەوتنی بەرەوپێشکەوتوو",
    "url": "https://www.figure.ai",
    "category": "Robotics",
    "source": "دەستی"
  },
 {
    "name": "ClipDrop",
    "description": "سیستەمی دەستکاری وێنە بە هۆشی دەستکرد",
    "url": "https://clipdrop.co",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Photoleap",
    "description": "ئەپی دەستکاری وێنە بە هۆشی دەستکرد لە لایەن Lightricks",
    "url": "https://www.photoleapapp.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Prisma",
    "description": "فلتەری هونەری و دەستکاری وێنە بە هۆشی دەستکرد",
    "url": "https://prisma-ai.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "FaceApp",
    "description": "ئەپی دەستکاری ڕوخسار و تەمەن بە هۆشی دەستکرد",
    "url": "https://www.faceapp.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Kaiber",
    "description": "دروستکردنی ڤیدیۆ بە هۆشی دەستکرد لە دەق و وێنەوە",
    "url": "https://kaiber.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "LeiaPix",
    "description": "گۆڕینی وێنەکان بۆ ئەنیمەیشنی سێ ڕەهەندی",
    "url": "https://convert.leiapix.com",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "MyHeritage AI",
    "description": "وێنەی کۆنەکان بە هۆشی دەستکرد ئەنیمەیت بکە",
    "url": "https://www.myheritage.com/ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Immersity AI",
    "description": "گۆڕینی وێنەی 2D بۆ تێکست و وێنەی 3D",
    "url": "https://www.immersity.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "LTX Studio",
    "description": "پلاتفۆرمی فیلمبرداری هۆشی دەستکرد",
    "url": "https://ltx.studio",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Haiper",
    "description": "مۆدێلی بنچینەی پەیوەندیدانی ڤیدیۆ بۆ دروستکردن",
    "url": "https://haiper.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Moonvalley",
    "description": "تێکست و وێنە بۆ مۆدێلی ڤیدیۆی هۆشی دەستکرد",
    "url": "https://moonvalley.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Pixverse",
    "description": "دروستکردنی ڤیدیۆی چند شێوەیی بە هۆشی دەستکرد",
    "url": "https://pixverse.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Viggle",
    "description": "دروستکردنی ڤیدیۆی بە شێوەیی کۆنترۆڵکراو",
    "url": "https://viggle.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Suno",
    "description": "دروستکردنی موزیک بە شێوەیی نووسینی تێکست",
    "url": "https://suno.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Udio",
    "description": "پلاتفۆرمی دروستکردنی موزیک بە هۆشی دەستکرد",
    "url": "https://www.udio.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Stable Audio",
    "description": "مۆدێلی دروستکردنی ئاواییی Stability AI",
    "url": "https://stableaudio.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Audiocraft",
    "description": "کیتەی دروستکردنی ئاواییی Meta",
    "url": "https://audiocraft.metademolab.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Riffusion",
    "description": "دروستکردنی موزیک لە کاتی ڕاستەوخۆ بە شێوەیی diffusionی پەیوەندیدار",
    "url": "https://www.riffusion.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Voicemod",
    "description": "گۆڕینی دەنگ لە کاتی ڕاستەوخۆ بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.voicemod.net",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Resemble AI",
    "description": "دروستکردنی دەنگ بە شێوەیی هۆشی دەستکرد و کلاونکردنی دەنگ",
    "url": "https://www.resemble.ai",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Podcastle",
    "description": "دروستکردنی پادکاست و ویرایشکردنی پادکاست بە شێوەیی هۆشی دەستکرد",
    "url": "https://podcastle.ai",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Adobe Podcast",
    "description": "تۆمارکردنی ئاوایی و ویرایشکردنی ئاوایی بە شێوەیی هۆشی دەستکرد",
    "url": "https://podcast.adobe.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Cleanvoice",
    "description": "ویرایشکردنی ئاوایی و پاککردنی ئاوایی بە شێوەیی هۆشی دەستکرد",
    "url": "https://cleanvoice.ai",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "v0 by Vercel",
    "description": "دروستکردنی UI بە شێوەیی نووسینی تێکست",
    "url": "https://v0.dev",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Bolt.new",
    "description": "ناوچەی پەرەسەندنی پڕۆژەی پڕەسەندنی AI",
    "url": "https://bolt.new",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Lovable",
    "description": "دروستکردنی ئەپلیکەیشن بە شێوەیی هۆشی دەستکرد و پڕەسەندنی پڕۆژە",
    "url": "https://lovable.dev",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Builder.ai",
    "description": "پلاتفۆرمی دروستکردنی ئەپلیکەیشن بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.builder.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Windmill",
    "description": "پلاتفۆرمی پەرەسەندنی پڕۆژە بە شێوەیی هۆشی دەستکرد",
    "url": "https://windmill.dev",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "CodeGPT",
    "description": "یارمەتیدەری پڕۆگرامەری هۆشی دەستکرد",
    "url": "https://codegpt.co",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Codemate",
    "description": "یارمەتیدەری پەیوەندیدانی هۆشی دەستکرد",
    "url": "https://codemate.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Metabob",
    "description": "بەرواری کۆدی هۆشی دەستکرد و تاقیکردنەوەی ئیشکراوەکان",
    "url": "https://metabob.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Refact",
    "description": "یارمەتیدەری کۆدی هۆشی دەستکردی سەرچاوەیەکی فەرمی",
    "url": "https://refact.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "CodeComplete",
    "description": "یارمەتیدەری کۆدی هۆشی دەستکردی بەرز",
    "url": "https://codecomplete.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Lex",
    "description": "یارمەتیدەری نووسینی هۆشی دەستکرد بۆ نووسەرەکان",
    "url": "https://lex.page",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Novel AI",
    "description": "داستان نووسینی هۆشی دەستکرد و دروستکردنی وێنە",
    "url": "https://novelai.net",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Moonbeam",
    "description": "یارمەتیدەری نووسینی هۆشی دەستکرد بۆ ناوەندی نووسین",
    "url": "https://www.gomoonbeam.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Compose AI",
    "description": "یارمەتیدەری نووسینی هۆشی دەستکرد بۆ بەرگرتنەوەی بەرەوپێش",
    "url": "https://www.compose.ai",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Copymatic",
    "description": "دروستکردنی ناوەڕۆکی هۆشی دەستکرد و جۆری نووسین",
    "url": "https://copymatic.ai",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Writecream",
    "description": "دروستکردنی ناوەڕۆکی هۆشی دەستکرد بۆ مارکێتینگ",
    "url": "https://www.writecream.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Shopify Magic",
    "description": "ئامرازەکانی هۆشی دەستکرد کە پەیوەندیدارە بەرنامەی Shopify",
    "url": "https://www.shopify.com/magic",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "WooCommerce AI",
    "description": "تێکەڵکردنی تایبەتمەندیەکانی هۆشی دەستکرد بۆ وێبگەڕی WordPress",
    "url": "https://woocommerce.com/ai",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "BigCommerce AI",
    "description": "تێکەڵکردنی تایبەتمەندیەکانی هۆشی دەستکرد بۆ پلاتفۆرمی تجارت",
    "url": "https://www.bigcommerce.com/ai",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Magento AI",
    "description": "تایبەتمەندیەکانی هۆشی دەستکرد بۆ کۆمەرسی Adobe",
    "url": "https://business.adobe.com/products/magento/magento-commerce.html",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Salesforce Commerce AI",
    "description": "AI بۆ تێکەڵکردنی تجرەبەکانی کۆمەرسی دیجیتاڵ",
    "url": "https://www.salesforce.com/products/commerce-cloud",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Amazon Personalize",
    "description": "خزمەتی فێرکاری ماشین بۆ شێوەندنی تایبەتی",
    "url": "https://aws.amazon.com/personalize",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Monetate",
    "description": "پلاتفۆرمی تایبەتمەندی و تاقیکردنەوەی AI",
    "url": "https://monetate.com",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Rich Relevance",
    "description": "تایبەتمەندیەکانی هۆشی دەستکرد بۆ کەرتی فرۆشتن",
    "url": "https://www.richrelevance.com",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Yext AI",
    "description": "وەڵامەکان و گەڕانەکان بۆ مارکەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.yext.com/platform/answers",
    "category": "تجارت",
    "source": "دەستی"
  },
  {
    "name": "Thundercontent",
    "description": "دروستکردنی ناوەڕۆکی هۆشی دەستکرد بۆ بلاگ و مارکێتینگ",
    "url": "https://thundercontent.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Article Fiesta",
    "description": "نووسینی ئەرتیكڵ بە شێوەیی هۆشی دەستکرد و بڵاوبوونەوەی خۆکار بۆ WordPress",
    "url": "https://articlefiesta.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Kafkai",
    "description": "ئالگۆریتمی فێرکاری ماشین بۆ دروستکردنی ناوەڕۆک",
    "url": "https://kafkai.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "WordAI",
    "description": "نووسینی نوێی هۆشی دەستکرد و چەندین جۆری ناوەڕۆک",
    "url": "https://wordai.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Textcortex",
    "description": "یارمەتیدەری نووسینی هۆشی دەستکرد بۆ ناوەڕۆکی خەیاڵی و کەرتی کاروباری",
    "url": "https://textcortex.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Writeseed",
    "description": "دروستکردنی نووسینی هۆشی دەستکرد بۆ ناوەڕۆکی مارکێتینگ",
    "url": "https://writeseed.com",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Chibi AI",
    "description": "یارمەتیدەری نووسینی هۆشی دەستکرد بۆ بلاگەکان و مارکێتەرەکان",
    "url": "https://chibi.ai",
    "category": "نووسین",
    "source": "دەستی"
  },
  {
    "name": "Topaz Video AI",
    "description": "پەرەسەندنی ڤیدیۆی هۆشی دەستکرد و بەرزکردنەوەی وێنە",
    "url": "https://www.topazlabs.com/topaz-video-ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Wondershare Filmora AI",
    "description": "نرمەکاڵەی ڤیدیۆی پەرەسەندراوی هۆشی دەستکرد",
    "url": "https://filmora.wondershare.com/ai-video-editing.html",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "NVIDIA Broadcast",
    "description": "تایبەتمەندی هۆشی دەستکرد بۆ ڕووبەری زنده و کەڵکەوتنەوەی ڤیدیۆ",
    "url": "https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Remaker AI",
    "description": "ئامرازەکانی هۆشی دەستکرد بۆ گۆڕینی چەهرە و ویرایشکردنی ڤیدیۆ",
    "url": "https://remaker.ai",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "DeepBrain AI",
    "description": "دروستکردنی ڤیدیۆی هۆشی دەستکرد بە شێوەیی مرۆیەتی",
    "url": "https://www.deepbrain.io",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Deepfake Web",
    "description": "دروستکردنی ڤیدیۆی دیپفەیک لە ئینتەرنێت",
    "url": "https://deepfakesweb.com",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Xpression Camera",
    "description": "گۆڕینی چەهرەی ڕاستەوخۆ بۆ ڕووبەری زنده بە شێوەیی هۆشی دەستکرد",
    "url": "https://xpressioncamera.com",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Puppetry",
    "description": "پەیکەرەکانی ڤیدیۆی پەرەسەندراوی هۆشی دەستکرد",
    "url": "https://puppetry.fm",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "DeepMotion",
    "description": "گرتنی هەنگاو و پەرەسەندنی شێوەی 3D بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.deepmotion.com",
    "category": "ڤیدیۆ",
    "source": "دەستی"
  },
  {
    "name": "Vocal Remover",
    "description": "ئامرازێکی هۆشی دەستکرد بۆ لابردنی دەنگ لە ڕووداوەکان",
    "url": "https://vocalremover.org",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Songfinch",
    "description": "دروستکردنی گۆرانی تایبەتی بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.songfinch.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Magenta Studio",
    "description": "ئامرازەکانی دروستکردنی موزیک بە شێوەیی هۆشی دەستکردی Google",
    "url": "https://magenta.tensorflow.org/studio",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Infinite Album",
    "description": "موزیکی ئیشکراوی هۆشی دەستکرد بەرەوپێشکەوتوو",
    "url": "https://www.infinitealbum.io",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Melody ML",
    "description": "جیاکردنەوەی شتێکی موزیک بەرەوپێشکەوتوو بە شێوەیی هۆشی دەستکرد",
    "url": "https://melody.ml",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Moises",
    "description": "ئاپی تمرینی موزیک بە شێوەیی هۆشی دەستکرد و جیاکردنەوەی شتێک",
    "url": "https://moises.ai",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Fadr",
    "description": "دروستکردنی موزیک بە شێوەیی هۆشی دەستکرد و لابردنی شتێک",
    "url": "https://fadr.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Songtell",
    "description": "پەیوەندیدانی مانای گۆرانی بە شێوەیی هۆشی دەستکرد",
    "url": "https://songtell.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Amadeus Code",
    "description": "ئاپی یارمەتیدەری نووسینی گۆرانی بە شێوەیی هۆشی دەستکرد",
    "url": "https://amadeuscode.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Loudly",
    "description": "پلاتفۆرمی دروستکردنی موزیک بەرەوپێشکەوتوو بۆ دروستکەرەکان",
    "url": "https://www.loudly.com",
    "category": "ئاوایی",
    "source": "دەستی"
  },
  {
    "name": "Waifu2x",
    "description": "بەرزکردنەوەی وێنە بەرەوپێشکەوتوو بۆ وێنەی شێوەیی انیمە",
    "url": "https://waifu2x.udp.jp",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Gigapixel AI",
    "description": "نرمەکاڵەی بەرزکردنەوەی وێنەی Topaz Labs",
    "url": "https://www.topazlabs.com/gigapixel-ai",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "DeOldify",
    "description": "رەنگینکردنی وێنەکان بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    "url": "https://deoldify.ai",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "MyHeritage In Color",
    "description": "خزمەتی رەنگینکردنی وێنە بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.myheritage.com/incolor",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Cutout.pro",
    "description": "دروستکردنی وێنە و لابردنی پسپۆڕەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.cutout.pro",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Clipping Magic",
    "description": "ئامرازێکی هۆشی دەستکرد بۆ لابردنی پسپۆڕەکان",
    "url": "https://clippingmagic.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "PhotoRoom",
    "description": "دروستکردنی وێنە و ویرایشکردنی وێنە بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.photoroom.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Unscreen",
    "description": "لابردنی پسپۆڕەکان لە ڤیدیۆ بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.unscreen.com",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Let's Enhance",
    "description": "بەرزکردنەوەی وێنە و پەرەسەندنی وێنە بە شێوەیی هۆشی دەستکرد",
    "url": "https://letsenhance.io",
    "category": "وێنە",
    "source": "دەستی"
  },
  {
    "name": "Crayon AI",
    "description": "پلاتفۆرمی زانیاریی پەیوەندیدار",
    "url": "https://www.crayon.co",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Klenty",
    "description": "پلاتفۆرمی پەیوەندیدانی فرۆشتن",
    "url": "https://www.klenty.com",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Outreach AI",
    "description": "پەیوەندیدانی فرۆشتن و خزمەتگوزارییەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.outreach.io",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Reply.io",
    "description": "پلاتفۆرمی خزمەتگوزاریی فرۆشتن بە شێوەیی هۆشی دەستکرد",
    "url": "https://reply.io",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Regie.ai",
    "description": "دروستکردنی ناوەڕۆکی هۆشی دەستکرد بۆ تیمە فرۆشتن",
    "url": "https://www.regie.ai",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Lavender AI",
    "description": "یارمەتیدەری ئیمەیڵ بۆ تیمە فرۆشتن",
    "url": "https://www.lavender.ai",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Seamless.AI",
    "description": "دروستکردنی سەرچاوەی فرۆشتن بە شێوەیی هۆشی دەستکرد",
    "url": "https://seamless.ai",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "People.ai",
    "description": "پلاتفۆرمی زانیاریی ئیشکراو بەرز",
    "url": "https://people.ai",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Conversica",
    "description": "یارمەتیدەری فرۆشتن بۆ پەیوەندیدانی سەرچاوە",
    "url": "https://www.conversica.com",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Drift AI",
    "description": "AIی پەیوەندیدانی بەرز بۆ فرۆشتن و مارکێتینگ",
    "url": "https://www.drift.com",
    "category": "کەرتی کاروبار",
    "source": "دەستی"
  },
  {
    "name": "Testim",
    "description": "پلاتفۆرمی خزمەتگوزاریی تاقیکردنەوەی پڕۆگرامەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.testim.io",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Mabl",
    "description": "پلاتفۆرمی خزمەتگوزاریی تاقیکردنەوەی پڕۆگرامەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.mabl.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Applitools",
    "description": "پلاتفۆرمی تاقیکردنەوەی بینینی ئیشکراو بە شێوەیی هۆشی دەستکرد",
    "url": "https://applitools.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Functionize",
    "description": "پلاتفۆرمی تاقیکردنەوەی پڕۆگرامەکان بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.functionize.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Diffblue",
    "description": "دروستکردنی تاقیکردنەوەی یەکەی بەرز بۆ Java بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.diffblue.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "Codeball",
    "description": "بەرواری کۆدی هۆشی دەستکرد بۆ داواکارییەکان",
    "url": "https://codeball.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "GitKraken AI",
    "description": "تایبەتمەندیەکانی هۆشی دەستکرد بۆ جۆری کارەکانی Git",
    "url": "https://www.gitkraken.com/git-client",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "What The Diff",
    "description": "یارمەتیدەری تاقیکردنەوەی کۆد",
    "url": "https://whatthediff.ai",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "CodeScene",
    "description": "تحلیلکردنی کۆدی هۆشی دەستکرد و بەڕێوەبردنی قەرزە فنییەکان",
    "url": "https://codescene.com",
    "category": "کۆد",
    "source": "دەستی"
  },
  {
    "name": "PathAI",
    "description": "پلاتفۆرمی پەیوەندیدانی پەیوەندیدار بەرز",
    "url": "https://www.pathai.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Paige",
    "description": "سیستەمی دەرکەوتنی پەیوەندیدار بەرز",
    "url": "https://paige.ai",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Viz.ai",
    "description": "دەرکەوتنی هەڵەی شێوەیی هۆشی دەستکرد و ئاگاداری",
    "url": "https://www.viz.ai",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Zebra Medical",
    "description": "تحلیلکردنی وێنەی پزیشکی بەرز بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.zebra-med.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Arterys",
    "description": "پلاتفۆرمی وێنەی پزیشکی بەرز",
    "url": "https://arterys.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Aidoc",
    "description": "ئامرازەکانی رادیۆلۆژی بەرز بۆ چاککردنی زود",
    "url": "https://www.aidoc.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Tempus",
    "description": "پلاتفۆرمی پزیشکی بەرز بەرەوپێشکەوتوو",
    "url": "https://www.tempus.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Flatiron Health",
    "description": "پلاتفۆرمی تێگەیشتنی پزیشکی بەرز",
    "url": "https://flatiron.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Deep Genomics",
    "description": "پلاتفۆرمی فێرکاری دارو بەرەوپێشکەوتوو",
    "url": "https://www.deepgenomics.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Atomwise",
    "description": "فێرکاری دارو و پەرەسەندنی دارو بەرەوپێشکەوتوو",
    "url": "https://www.atomwise.com",
    "category": "تندرستی",
    "source": "دەستی"
  },
  {
    "name": "Third Space Learning",
    "description": "پلاتفۆرمی فێرکاری بەرز بۆ ریاضی",
    "url": "https://thirdspacelearning.com",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Nuance Dragon",
    "description": "پەیوەندیدانی دەنگی هۆشی دەستکرد بۆ فێرکاری",
    "url": "https://www.nuance.com/dragon.html",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Udacity AI",
    "description": "فێرکاری پڕۆگرامی بەرز بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.udacity.com",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "edX AI",
    "description": "تایبەتمەندیەکانی هۆشی دەستکرد لە پلاتفۆرمی فێرکاری ئینتەرنێت",
    "url": "https://www.edx.org",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Edmodo AI",
    "description": "ئامرازەکانی هۆشی دەستکرد بۆ بەڕێوەبردنی کلاسی",
    "url": "https://new.edmodo.com",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Blackboard AI",
    "description": "سیستەمی فەرمی فێرکاری پەیوەندیدار بەرز",
    "url": "https://www.blackboard.com",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Canvas AI",
    "description": "تایبەتمەندیەکانی هۆشی دەستکرد لە پلاتفۆرمی فێرکاری",
    "url": "https://www.instructure.com/canvas",
    "category": "پەروەردە",
    "source": "دەستی"
  },
  {
    "name": "Kabbage",
    "description": "پلاتفۆرمی قەرزدان بەرەوپێشکەوتوو بەرەوپێشکەوتوو",
    "url": "https://www.kabbage.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "LendingClub",
    "description": "پلاتفۆرمی قەرزدان لە نێوان بەکارهێنەران",
    "url": "https://www.lendingclub.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "SoFi AI",
    "description": "بەرەوپێشکەوتنی دارایی بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.sofi.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Credit Karma",
    "description": "پاشکەوتکردنی قەرز و رێنمایی دارایی بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.creditkarma.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Robinhood AI",
    "description": "پێشنیازی تۆمارکردن و بەڕێوەبردنی پۆrtفۆلیۆ بە شێوەیی هۆشی دەستکرد",
    "url": "https://robinhood.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Acorns AI",
    "description": "پلاتفۆرمی مایکرو-سەرمایەگذاری بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.acorns.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Stash AI",
    "description": "پلاتفۆرمی رێنمایی سەرمایەگذاری بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.stash.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Qapital",
    "description": "ئاپی پاشکەوتکردنی دارایی و سەرمایەگذاری بە شێوەیی هۆشی دەستکرد",
    "url": "https://www.qapital.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "PiggyBot",
    "description": "بەرزکردنەوەی پاشکەوتکردنی دارایی",
    "url": "https://www.piggybot.com",
    "category": "دارایی",
    "source": "دەستی"
  },
  {
    "name": "Clarity Money",
    "description": "ئاپی چاکسازی دارایی بەرەوپێشکەوتوو",
    "url": "https://www.marcus.com/us/en/clarity-money",
    "category": "دارایی",
    "source": "دەستی"
  }
];
const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = useMemo(() => {
    const cats = Array.from(new Set(aiTools.map(tool => tool.category)));
    return ["all", ...cats];
  }, []);
  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);
  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-4">
              <span className="text-purple-300 text-sm font-medium">Kurdish AI Tools Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight py-[12px]">
              ئامرازەکانی AI
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              کۆمەڵەیەکی باشترین ئامرازەکانی زیرەکی دەستکرد بۆ پیشەسازی و نووسین
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{filteredTools.length} ئامراز لە {aiTools.length} ئامراز</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input placeholder="گەڕان بە ناو یان وەسف..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 pr-4 h-14 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 rounded-xl backdrop-blur-sm" />
          </div>
          <div className="relative lg:w-64">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 z-10" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-14 pl-12 pr-4 bg-slate-900/50 border-slate-700/50 text-white rounded-xl backdrop-blur-sm focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20">
                <SelectValue placeholder="هەموو پۆلەکان" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900/95 border-slate-700/50 rounded-xl backdrop-blur-xl">
                {categories.map(category => <SelectItem key={category} value={category} className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 rounded-lg">
                    {category === "all" ? "هەموو پۆلەکان" : category}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTools.map((tool, index) => <Card key={tool.name} className="group bg-slate-900/40 border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer animate-fade-in backdrop-blur-sm rounded-2xl overflow-hidden" style={{
          animationDelay: `${index * 100}ms`
        }} onClick={() => handleToolClick(tool.url)}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors text-lg font-semibold mb-3 truncate">
                      {tool.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-200 border-purple-500/30 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300">
                      {tool.category}
                    </Badge>
                  </div>
                  <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-purple-300 transition-colors flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors line-clamp-2 leading-relaxed mb-6">
                  {tool.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    سەرچاوە: {tool.source}
                  </span>
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100" />
                </div>
              </CardContent>
            </Card>)}
        </div>

        {filteredTools.length === 0 && <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">هیچ ئامرازێک نەدۆزرایەوە</h3>
            <p className="text-slate-400 text-lg">
              تکایە گەڕانەکەت بگۆڕە یان فلتەرەکە بسڕەوە
            </p>
          </div>}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
            </div>
            <p className="text-slate-400 text-lg">
              © ٢٠٢٤ ئامرازەکانی AI - کۆکراوەتەوە بە خۆشەویستی بۆ کۆمەڵگای کوردی
            </p>
            <p className="text-slate-500 font-medium">
              دروستکراوە لەلایەن هێمن محەمەد ئەمین
            </p>
            <div className="flex justify-center space-x-6 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{
              animationDelay: '0.5s'
            }}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{
              animationDelay: '1s'
            }}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;