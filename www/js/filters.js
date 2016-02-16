function BaseFilter() { }
BaseFilter.prototype.doFilter = function(entry) {
  return true;
}

function DescriptionRequiredFilter() { }
DescriptionRequiredFilter.prototype = new BaseFilter();
DescriptionRequiredFilter.prototype.constructor = DescriptionRequiredFilter;
DescriptionRequiredFilter.prototype = {
  doFilter: function(entry) {
    return entry.contentSnippet != 'undefined' && entry.contentSnippet != '';
  }
}

function AlwaysTrueFilter() { }
AlwaysTrueFilter.prototype = new BaseFilter();
AlwaysTrueFilter.prototype.constructor = AlwaysTrueFilter;
AlwaysTrueFilter.prototype = {
  doFilter: function(entry) {
    return true;
  }
}

function CompositeFilter() {
    this.children = [];
}
CompositeFilter.prototype = {
  add: function (child) {
    this.children.push(child);
  },
  remove: function (child) {
    for (var node, i = 0; node = this.getChild(i); i++) {
      if (node == child) {
        this.children.splice(i, 1);
        return true;
      }

      if (node.remove(child)) {
        return true;
      }
    }
    return false;
  },
  doFilter: function(entry) {
    var ret = true;
    for (var i = 0; i < this.children.length; i++) {
      ret = ret && this.children[i].doFilter(entry);
    }
    return ret;
  }
}

function KeywordsFilter() {
    this.keywords = [];
}
KeywordsFilter.prototype = new BaseFilter();
KeywordsFilter.prototype.constructor = KeywordsFilter;
KeywordsFilter.prototype = {
  addKeyword: function(keyword) {
    this.keywords.push(keyword);
  },
  doFilter: function(entry) {
    for (var i = 0; i < this.keywords.length; i++) {
      var lowerCaseKey = this.keywords[i].toLowerCase();
      if (entry.title.toLowerCase().indexOf(lowerCaseKey) > -1) {
        return true;
      }
      if (entry.contentSnippet.toLowerCase().indexOf(lowerCaseKey) > -1) {
        return true;
      }
    }
    return false;
  }
}
