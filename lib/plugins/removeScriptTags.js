module.exports = {
  beforeInit: function(page, next) {
    var disableTagsRe = /<script[^<]+(?:google-analytics\.com)[^<]+<\/script>|<link [^>]+>/g;
    page.html = page.html.replace(disableTagsRe, '<!-- Prerender: $& -->');

    next();
  },
  beforeSend: function(page, next) {
    if (!page.html) {
      return next();
    }

    var stripCommentsRe = /<!--( Prerender: )?([\S\s]*?)-->|<(?:script|iframe)[^>]*>[\S\s]*?<\/(?:script|iframe)>/g;
    page.html = page.html.replace(stripCommentsRe, function(match, prerender, body) {
      if (prerender) {
        return body;
      } else {
        return '';
      }
    });

    next();
  }
};
