// Weblio辞書(https://ejje.weblio.jp/)の全画面に表示される広告を削除する
//
// 全画面広告は、通常以下のようなタイミングで表示される。
// - 別のタブ開いて、再びWeblio辞書のタブを開いたとき
// - ブラウザの戻る機能で前の画面へ戻ったとき
// - 単語をクリックしたときなど、サイト内のいくつかのUIを操作したとき
// いずれも、一回発生した後はしばらく発生しなくなる。開発用に再現したいならシークレットモードで実行する。
//
// 広告表示直前に document.body になんらかの変化が発生するので、その時点で該当の要素を削除するロジック。
//
// <ins class="adsbygoogle adsbygoogle-noablate"> が全画面に表示される際のDOMの枠なのだが、
// これに対して MutationObserver を設定しても、なぜか style の更新を検知できなかった。
// そのため、直接に関係ある変化だけかはわからないが、少なくとも広告表示直前に変化はある document.body とその直接の子の変化に対して発火している。
// つまり、かなり雑なロジックである。
const mo = new MutationObserver((mutations, observer) => {
  const googleAdElement = document.querySelector("ins.adsbygoogle");
  if (googleAdElement) {
    googleAdElement.remove();
  }
});
mo.observe(document.body, {
  attributes: true,
  // characterDataOldValue: true,
  childList: true,
});
