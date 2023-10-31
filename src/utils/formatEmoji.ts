import { EMOJI_REGEXP } from "@/utils/constants";

type ElementWithSetHTMLMethod = Element & {setHTML?: Function}


export default function formatEmoji(el: HTMLElement) {
  el.querySelectorAll(".format-emoji").forEach((m:ElementWithSetHTMLMethod) => {
   m.setHTML?.(m.innerHTML.replace(
      EMOJI_REGEXP,
      (match) =>
        `<span style='font-family:"Noto Color Emoji", sans-serif'>${match}</span>`
    ));
    m.classList.remove("format-emoji");
  });
}
