import { EMOJI_REGEXP } from "@/utils/constants";

export default function formatEmoji(el: HTMLElement) {
  el.querySelectorAll(".format-emoji").forEach((m) => {
    m.innerHTML = m.innerHTML.replace(
      EMOJI_REGEXP,
      (match) =>
        `<span style='font-family:"Noto Color Emoji", sans-serif'>${match}</span>`
    );
    m.classList.remove("format-emoji");
  });
}
