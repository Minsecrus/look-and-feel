import { Article, Aside, ExtLink, H2, Note, P } from "~/components/prose";
import { ProseImage } from "~/components/ProseImage";
import { requireTopic } from "~/content/topics";
import { PlayerOutlineDemo } from "./demos/PlayerOutlineDemo";
import notepadDraft from "./notepad-draft.png";

const topic = requireTopic("content");
const PERSONAL_SITE_URL = "https://minsecrus.github.io";

export function meta() {
  return [
    { title: "第一个网站 · 内容 · 顺眼顺手" },
    { name: "description", content: "从你的第一个个人网站说起：为什么界面要从内容开始。" },
  ];
}

export default function ContentIntro() {
  return (
    <Article topic={topic}>
      <P>
        Hi！欢迎来到《顺眼顺手》，我是 <ExtLink href={PERSONAL_SITE_URL}>Minsecrus</ExtLink>。
      </P>

      <P>
        上一段中的链接指向我的个人网站。即使不点开，聪明的你大概也能知道里面装着什么——我是谁，我喜欢做什么，我做过什么项目
        or 成果，如何找到我<Aside>（嗯，就是联系方式）</Aside>……
      </P>

      <P>
        我相信你已经做过 N 个网站了（尤其是现在 AI 工具的发展，把网页<strong>做出来</strong>的成本降低了太多），而且说不定，你的第一个网站恰好也是介绍自己的页面。乍一听非常自然，但细想一下，为什么偏偏是它呢？为什么我们会想当然地把个人网站作为首作呢？
      </P>

      <P>
        我的答案：<strong>有话可说</strong>。
      </P>

      <P>
        做商业网站需要有业务；做学习网站需要有资料；做工具网站，需要“能干的事”；做社区，需要有“人”和“讨论”；做个人网站不一样，只需要对自己的了解和感知。
      </P>

      <P>
        一段自我介绍、一份教程资料、一件待售的商品，还是一个能帮你解决具体问题的小功能——这里把它们统称为<strong>内容</strong>。内容是网站值得存在、值得别人点开的全部理由；本书所有剩下的主题，都是为内容服务的。
      </P>

      <Note>
        <P>
          整本《顺眼顺手》主要拿网站举例子，因为网站开发零门槛，改代码就看得到效果；但这背后让东西“顺眼和顺手”的方法论放到任何程序界面甚至实体物件面板上依然成立。
        </P>
      </Note>

      <H2 id="write-first">先写字再画界面</H2>

      <P>
        既然内容是一切的核心，编写网站时的第一步，就可以打开记事本或者空白 Markdown，把要放进页面里的内容写成文字。比如我在写这页教程的时候……
      </P>

      <ProseImage
        src={notepadDraft}
        width={3070}
        height={1644}
        wide
        alt="在本地浏览器预览顺眼顺手首页时，前方打开着正在用纯文本起草本页内容的 Windows 记事本窗口"
      />

      <P>
        文字之外的内容，也可以沿着布局展开的方向依次用文字描述。比如我最近写的这个播放器页面：
      </P>

      <PlayerOutlineDemo />

      <P>
        把内容写成纯文本，有两点好处：改内容改顺序很容易；更能意识到哪些内容应该留下，哪些应该舍弃，哪些没有交代清楚需要补充。
      </P>

      <P>
        既然在记事本里写的内容大多是真实有效的，那当今各种网站里面满天飞的虚假无用的内容是哪里来的呢？相信你已经有答案了：Vibe
        UI 呀！使用 AI 写网站的人，多多少少经历过“版面铺满”的困境吧。
      </P>

      <Note>
        <P>
          关于基于大语言模型的 AI 工具“为什么”在宽泛的提示词下会写出令人不忍直视的凑数界面的探讨超出了本书的范围。可能涉及到分布收敛、偏好训练中的长度/冗余偏差、审美近亲繁殖和“截屏导向”的评测错配等原因。
        </P>
      </Note>

      <P>
        下一页，我们就来探讨“真内容”和“假内容”：看看怎样辨别界面中的假内容，并将其替换成真内容——尤其是
        AI 吐出了一大堆意义不明的 UI 之后。
      </P>
    </Article>
  );
}
