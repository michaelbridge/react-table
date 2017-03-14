'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//
exports.default = {
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent
};


function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs) {
  return arr.sort(function (a, b) {
    for (var i = 0; i < funcs.length; i++) {
      var comp = funcs[i];
      var ca = comp(a);
      var cb = comp(b);
      var desc = dirs[i] === false || dirs[i] === 'desc';
      if (ca > cb) {
        return desc ? -1 : 1;
      }
      if (ca < cb) {
        return desc ? 1 : -1;
      }
    }
    return dirs[0] ? a.__index - b.__index : b.__index - b.__index;
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass) {
  return function (_ref) {
    var children = _ref.children;
    var className = _ref.className;

    var rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(compClass, className)
      }, rest),
      children
    );
  };
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className;
  var style = _ref2.style;

  var rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest
  };
}

function compactObject(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Comp.prototype.isReactComponent ? _react2.default.createElement(Comp, params) : Comp(params) : fallback;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJnZXRGaXJzdERlZmluZWQiLCJzdW0iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJncm91cEJ5IiwiaXNBcnJheSIsInNwbGl0UHJvcHMiLCJjb21wYWN0T2JqZWN0IiwiaXNTb3J0aW5nRGVzYyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsIm9iaiIsInBhdGgiLCJkZWYiLCJwYXRoT2JqIiwibWFrZVBhdGhBcnJheSIsInZhbCIsInJlZHVjZSIsImN1cnJlbnQiLCJwYXRoUGFydCIsImUiLCJ2YWx1ZSIsImtleXMiLCJrZXlQYXJ0IiwiY3Vyc29yIiwic2hpZnQiLCJsZW5ndGgiLCJhcnIiLCJuIiwic3RhcnQiLCJzbGljZSIsImkiLCJwdXNoIiwiZnVuY3MiLCJkaXJzIiwic29ydCIsImEiLCJiIiwiY29tcCIsImNhIiwiY2IiLCJkZXNjIiwiX19pbmRleCIsImZpbHRlciIsIm8iLCJyIiwic3BsaWNlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidG9TdHJpbmciLCJhcmdzIiwiY29tcENsYXNzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJyZXN0IiwieHMiLCJydiIsIngiLCJyZXNLZXkiLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJkIiwiYXNjIiwiQ29tcCIsInBhcmFtcyIsImZhbGxiYWNrIiwicHJvdG90eXBlIiwiaXNSZWFjdENvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUNBO2tCQUNlO0FBQ2JBLFVBRGE7QUFFYkMsVUFGYTtBQUdiQyxzQkFIYTtBQUliQyxZQUphO0FB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Y3ZDLElBQUl1QyxHQUFKLENBQWQ7QUFDRDtBQUNGO0FBQ0QsU0FBT2tCLE1BQVA7QUFDRDs7QUFFRCxTQUFTM0QsYUFBVCxDQUF3QjhELENBQXhCLEVBQTJCO0FBQ3pCLFNBQU8sQ0FBQyxFQUFFQSxFQUFFcEMsSUFBRixLQUFXLE1BQVgsSUFBcUJvQyxFQUFFOUIsSUFBRixLQUFXLElBQWhDLElBQXdDOEIsRUFBRUMsR0FBRixLQUFVLEtBQXBELENBQVI7QUFDRDs7QUFFRCxTQUFTOUQsa0JBQVQsQ0FBNkIrRCxJQUE3QixFQUFpRTtBQUFBLE1BQTlCQyxNQUE4Qix1RUFBckIsRUFBcUI7QUFBQSxNQUFqQkMsUUFBaUIsdUVBQU5GLElBQU07O0FBQy9ELFNBQU8sT0FBT0EsSUFBUCxLQUFnQixVQUFoQixHQUNMQSxLQUFLRyxTQUFMLENBQWVDLGdCQUFmLEdBQ0UsOEJBQUMsSUFBRCxFQUNNSCxNQUROLENBREYsR0FJSUQsS0FBS0MsTUFBTCxDQUxDLEdBTUhDLFFBTko7QUFPRCIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG4vL1xuZXhwb3J0IGRlZmF1bHQge1xuICBnZXQsXG4gIHNldCxcbiAgdGFrZVJpZ2h0LFxuICBsYXN0LFxuICBvcmRlckJ5LFxuICByYW5nZSxcbiAgcmVtb3ZlLFxuICBjbG9uZSxcbiAgZ2V0Rmlyc3REZWZpbmVkLFxuICBzdW0sXG4gIG1ha2VUZW1wbGF0ZUNvbXBvbmVudCxcbiAgZ3JvdXBCeSxcbiAgaXNBcnJheSxcbiAgc3BsaXRQcm9wcyxcbiAgY29tcGFjdE9iamVjdCxcbiAgaXNTb3J0aW5nRGVzYyxcbiAgbm9ybWFsaXplQ29tcG9uZW50XG59XG5cbmZ1bmN0aW9uIGdldCAob2JqLCBwYXRoLCBkZWYpIHtcbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIG9ialxuICB9XG4gIGNvbnN0IHBhdGhPYmogPSBtYWtlUGF0aEFycmF5KHBhdGgpXG4gIGxldCB2YWxcbiAgdHJ5IHtcbiAgICB2YWwgPSBwYXRoT2JqLnJlZHVjZSgoY3VycmVudCwgcGF0aFBhcnQpID0+IGN1cnJlbnRbcGF0aFBhcnRdLCBvYmopXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyA/IHZhbCA6IGRlZlxufVxuXG5mdW5jdGlvbiBzZXQgKG9iaiA9IHt9LCBwYXRoLCB2YWx1ZSkge1xuICBjb25zdCBrZXlzID0gbWFrZVBhdGhBcnJheShwYXRoKVxuICBsZXQga2V5UGFydFxuICBsZXQgY3Vyc29yID0gb2JqXG4gIHdoaWxlICgoa2V5UGFydCA9IGtleXMuc2hpZnQoKSkgJiYga2V5cy5sZW5ndGgpIHtcbiAgICBpZiAoIWN1cnNvcltrZXlQYXJ0XSkge1xuICAgICAgY3Vyc29yW2tleVBhcnRdID0ge31cbiAgICB9XG4gICAgY3Vyc29yID0gY3Vyc29yW2tleVBhcnRdXG4gIH1cbiAgY3Vyc29yW2tleVBhcnRdID0gdmFsdWVcbiAgcmV0dXJuIG9ialxufVxuXG5mdW5jdGlvbiB0YWtlUmlnaHQgKGFyciwgbikge1xuICBjb25zdCBzdGFydCA9IG4gPiBhcnIubGVuZ3RoID8gMCA6IGFyci5sZW5ndGggLSBuXG4gIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQpXG59XG5cbmZ1bmN0aW9uIGxhc3QgKGFycikge1xuICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXVxufVxuXG5mdW5jdGlvbiByYW5nZSAobikge1xuICBjb25zdCBhcnIgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGFyci5wdXNoKG4pXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBvcmRlckJ5IChhcnIsIGZ1bmNzLCBkaXJzKSB7XG4gIHJldHVybiBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbXAgPSBmdW5jc1tpXVxuICAgICAgY29uc3QgY2EgPSBjb21wKGEpXG4gICAgICBjb25zdCBjYiA9IGNvbXAoYilcbiAgICAgIGNvbnN0IGRlc2MgPSBkaXJzW2ldID09PSBmYWxzZSB8fCBkaXJzW2ldID09PSAnZGVzYydcbiAgICAgIGlmIChjYSA+IGNiKSB7XG4gICAgICAgIHJldHVybiBkZXNjID8gLTEgOiAxXG4gICAgICB9XG4gICAgICBpZiAoY2EgPCBjYikge1xuICAgICAgICByZXR1cm4gZGVzYyA/IDEgOiAtMVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlyc1swXVxuICAgICAgPyBhLl9faW5kZXggLSBiLl9faW5kZXhcbiAgICAgIDogYi5fX2luZGV4IC0gYi5fX2luZGV4XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoYSwgYikge1xuICByZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24gKG8sIGkpIHtcbiAgICB2YXIgciA9IGIobylcbiAgICBpZiAocikge1xuICAgICAgYS5zcGxpY2UoaSwgMSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5mdW5jdGlvbiBjbG9uZSAoYSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGEsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9KSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBhXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rmlyc3REZWZpbmVkICguLi5hcmdzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0eXBlb2YgYXJnc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBhcmdzW2ldXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHN1bSAoYXJyKSB7XG4gIHJldHVybiBhcnIucmVkdWNlKChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGEgKyBiXG4gIH0sIDApXG59XG5cbmZ1bmN0aW9uIG1ha2VUZW1wbGF0ZUNvbXBvbmVudCAoY29tcENsYXNzKSB7XG4gIHJldHVybiAoe2NoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3R9KSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbXBDbGFzcywgY2xhc3NOYW1lKX1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBncm91cEJ5ICh4cywga2V5KSB7XG4gIHJldHVybiB4cy5yZWR1Y2UoKHJ2LCB4LCBpKSA9PiB7XG4gICAgY29uc3QgcmVzS2V5ID0gdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJyA/IGtleSh4LCBpKSA6IHhba2V5XVxuICAgIHJ2W3Jlc0tleV0gPSBpc0FycmF5KHJ2W3Jlc0tleV0pID8gcnZbcmVzS2V5XSA6IFtdXG4gICAgcnZbcmVzS2V5XS5wdXNoKHgpXG4gICAgcmV0dXJuIHJ2XG4gIH0sIHt9KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChhKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGEpXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gTm9uLWV4cG9ydGVkIEhlbHBlcnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBtYWtlUGF0aEFycmF5IChvYmopIHtcbiAgcmV0dXJuIGZsYXR0ZW5EZWVwKG9iailcbiAgICAgIC5qb2luKCcuJylcbiAgICAgIC5yZXBsYWNlKCdbJywgJy4nKVxuICAgICAgLnJlcGxhY2UoJ10nLCAnJylcbiAgICAgIC5zcGxpdCgnLicpXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5EZWVwIChhcnIsIG5ld0FyciA9IFtdKSB7XG4gIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgbmV3QXJyLnB1c2goYXJyKVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmbGF0dGVuRGVlcChhcnJbaV0sIG5ld0FycilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld0FyclxufVxuXG5mdW5jdGlvbiBzcGxpdFByb3BzICh7Y2xhc3NOYW1lLCBzdHlsZSwgLi4ucmVzdH0pIHtcbiAgcmV0dXJuIHtcbiAgICBjbGFzc05hbWUsXG4gICAgc3R5bGUsXG4gICAgcmVzdFxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBhY3RPYmplY3QgKG9iaikge1xuICBjb25zdCBuZXdPYmogPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIG9ialtrZXldICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9ialtrZXldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqXG59XG5cbmZ1bmN0aW9uIGlzU29ydGluZ0Rlc2MgKGQpIHtcbiAgcmV0dXJuICEhKGQuc29ydCA9PT0gJ2Rlc2MnIHx8IGQuZGVzYyA9PT0gdHJ1ZSB8fCBkLmFzYyA9PT0gZmFsc2UpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoQ29tcCwgcGFyYW1zID0ge30sIGZhbGxiYWNrID0gQ29tcCkge1xuICByZXR1cm4gdHlwZW9mIENvbXAgPT09ICdmdW5jdGlvbicgPyAoXG4gICAgQ29tcC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA/IChcbiAgICAgIDxDb21wXG4gICAgICAgIHsuLi5wYXJhbXN9XG4gICAgICAvPlxuICAgICkgOiBDb21wKHBhcmFtcylcbiAgKSA6IGZhbGxiYWNrXG59XG4iXX0=