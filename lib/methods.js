'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  getDataModel: function getDataModel(newState) {
    var _this = this;

    var columns = newState.columns;
    var _newState$pivotBy = newState.pivotBy;
    var pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy;
    var data = newState.data;
    var pivotIDKey = newState.pivotIDKey;
    var pivotValKey = newState.pivotValKey;
    var subRowsKey = newState.subRowsKey;
    var expanderColumnWidth = newState.expanderColumnWidth;
    var SubComponent = newState.SubComponent;
    var page = newState.page;
    var pages = newState.pages;
    var pageSize = newState.pageSize;

    // Determine Header Groups

    var hasHeaderGroups = false;
    columns.forEach(function (column) {
      if (column.columns) {
        hasHeaderGroups = true;
      }
    });

    // Build Header Groups
    var headerGroups = [];
    var currentSpan = [];

    // A convenience function to add a header and reset the currentSpan
    var addHeader = function addHeader(columns) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : columns[0];

      headerGroups.push(_extends({}, _this.props.column, column, {
        columns: columns
      }));
      currentSpan = [];
    };

    var noSubExpanderColumns = columns.map(function (col) {
      return _extends({}, col, {
        columns: col.columns ? col.columns.filter(function (d) {
          return !d.expander;
        }) : undefined
      });
    });

    var expanderColumnIndex = columns.findIndex(function (col) {
      return col.expander;
    });
    var needsExpander = (SubComponent || pivotBy.length) && expanderColumnIndex === -1;
    var columnsWithExpander = needsExpander ? [{ expander: true }].concat(_toConsumableArray(noSubExpanderColumns)) : noSubExpanderColumns;
    if (needsExpander) {
      expanderColumnIndex = 0;
    }

    var makeDecoratedColumn = function makeDecoratedColumn(column) {
      var dcol = _extends({}, _this.props.column, column);

      if (dcol.expander) {
        dcol.width = expanderColumnWidth;
        return dcol;
      }

      if (typeof dcol.accessor === 'string') {
        dcol.id = dcol.id || dcol.accessor;
        var accessorString = dcol.accessor;
        dcol.accessor = function (row) {
          return _utils2.default.get(row, accessorString);
        };
        return dcol;
      }

      if (dcol.accessor && !dcol.id) {
        console.warn(dcol);
        throw new Error('A column id is required if using a non-string accessor for column above.');
      }

      if (!dcol.accessor) {
        dcol.accessor = function (d) {
          return undefined;
        };
      }

      // Ensure minWidth is not greater than maxWidth if set
      if (dcol.maxWidth < dcol.minWidth) {
        dcol.minWidth = dcol.maxWidth;
      }

      return dcol;
    };

    // Decorate the columns
    var decorateAndAddToAll = function decorateAndAddToAll(col) {
      var decoratedColumn = makeDecoratedColumn(col);
      allDecoratedColumns.push(decoratedColumn);
      return decoratedColumn;
    };
    var allDecoratedColumns = [];
    var decoratedColumns = columnsWithExpander.map(function (column, i) {
      if (column.columns) {
        return _extends({}, column, {
          columns: column.columns.map(decorateAndAddToAll)
        });
      } else {
        return decorateAndAddToAll(column);
      }
    });

    // Build the visible columns, headers and flat column list
    var visibleColumns = decoratedColumns.slice();
    var allVisibleColumns = [];

    visibleColumns = visibleColumns.map(function (column, i) {
      if (column.columns) {
        var visibleSubColumns = column.columns.filter(function (d) {
          return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
        });
        return _extends({}, column, {
          columns: visibleSubColumns
        });
      }
      return column;
    });

    visibleColumns = visibleColumns.filter(function (column) {
      return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
    });

    // Move the pivot columns into a single column if needed
    if (pivotBy.length) {
      var pivotColumns = [];
      for (var i = 0; i < allDecoratedColumns.length; i++) {
        if (pivotBy.indexOf(allDecoratedColumns[i].id) > -1) {
          pivotColumns.push(allDecoratedColumns[i]);
        }
      }
      var _pivotColumn = _extends({}, pivotColumns[0], {
        pivotColumns: pivotColumns,
        expander: true
      });
      visibleColumns[expanderColumnIndex] = _pivotColumn;
    }

    // Build flast list of allVisibleColumns and HeaderGroups
    visibleColumns.forEach(function (column, i) {
      if (column.columns) {
        allVisibleColumns = allVisibleColumns.concat(column.columns);
        if (currentSpan.length > 0) {
          addHeader(currentSpan);
        }
        addHeader(column.columns, column);
        return;
      }
      allVisibleColumns.push(column);
      currentSpan.push(column);
    });
    if (hasHeaderGroups && currentSpan.length > 0) {
      addHeader(currentSpan);
    }

    // Access the data
    var resolvedData = data.map(function (d, i) {
      var row = {
        __original: d,
        __index: i
      };
      allDecoratedColumns.forEach(function (column) {
        if (column.expander) return;
        row[column.id] = column.accessor(d);
      });
      return row;
    });

    // If pivoting, recursively group the data
    var aggregate = function aggregate(rows) {
      var aggregationValues = {};
      aggregatingColumns.forEach(function (column) {
        var values = rows.map(function (d) {
          return d[column.id];
        });
        aggregationValues[column.id] = column.aggregate(values, rows);
      });
      return aggregationValues;
    };
    var standardColumns = pivotBy.length ? allVisibleColumns.slice(1) : allVisibleColumns;
    var aggregatingColumns = standardColumns.filter(function (d) {
      return d.aggregate;
    });
    var pivotColumn = void 0;
    if (pivotBy.length) {
      pivotColumn = allVisibleColumns[0];
      var groupRecursively = function groupRecursively(rows, keys) {
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        // This is the last level, just return the rows
        if (i === keys.length) {
          return rows;
        }
        // Group the rows together for this level
        var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
          var _ref3;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _ref3;
        });
        // Recurse into the subRows
        groupedRows = groupedRows.map(function (rowGroup) {
          var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
          return _extends({}, rowGroup, _defineProperty({}, subRowsKey, subRows), aggregate(subRows));
        });
        return groupedRows;
      };
      resolvedData = groupRecursively(resolvedData, pivotBy);
    }

    var newPages = _utils2.default.getFirstDefined(pages, Math.ceil(resolvedData.length / pageSize));
    var newPage = page > newPages ? newPage - 1 : page;

    return _extends({}, newState, {
      resolvedData: resolvedData,
      pivotColumn: pivotColumn,
      allVisibleColumns: allVisibleColumns,
      headerGroups: headerGroups,
      allDecoratedColumns: allDecoratedColumns,
      hasHeaderGroups: hasHeaderGroups,
      page: Math.max(newPage, 0)
    });
  },
  getSortedData: function getSortedData(resolvedState) {
    var manual = resolvedState.manual;
    var sorting = resolvedState.sorting;
    var resolvedData = resolvedState.resolvedData;

    // Resolve the data from either manual data or sorted data

    return {
      sortedData: manual ? resolvedData : this.sortData(resolvedData, sorting)
    };
  },
  fireOnChange: function fireOnChange() {
    this.props.onChange(this.getResolvedState(), this);
  },
  getPropOrState: function getPropOrState(key) {
    return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
  },
  getStateOrProp: function getStateOrProp(key) {
    return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
  },
  sortData: function sortData(data, sorting) {
    var _this2 = this;

    if (!sorting.length) {
      return data;
    }
    var sorted = _utils2.default.orderBy(data, sorting.map(function (sort) {
      return function (row) {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity;
        }
        return typeof row[sort.id] === 'string' ? row[sort.id].toLowerCase() : row[sort.id];
      };
    }), sorting.map(function (d) {
      return !d.desc;
    }));

    return sorted.map(function (row) {
      if (!row[_this2.props.subRowsKey]) {
        return row;
      }
      return _extends({}, row, _defineProperty({}, _this2.props.subRowsKey, _this2.sortData(row[_this2.props.subRowsKey], sorting)));
    });
  },
  getMinRows: function getMinRows() {
    return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
  },


  // User actions
  onPageChange: function onPageChange(page) {
    var _this3 = this;

    var _props = this.props;
    var onPageChange = _props.onPageChange;
    var collapseOnPageChange = _props.collapseOnPageChange;

    if (onPageChange) {
      return onPageChange(page);
    }
    var newState = { page: page };
    if (collapseOnPageChange) {
      newState.expandedRows = {};
    }
    this.setStateWithData(newState, function () {
      _this3.fireOnChange();
    });
  },
  onPageSizeChange: function onPageSizeChange(newPageSize) {
    var _this4 = this;

    var onPageSizeChange = this.props.onPageSizeChange;

    var _getResolvedState = this.getResolvedState();

    var pageSize = _getResolvedState.pageSize;
    var page = _getResolvedState.page;

    // Normalize the page to display

    var currentRow = pageSize * page;
    var newPage = Math.floor(currentRow / newPageSize);

    if (onPageSizeChange) {
      return onPageSizeChange(newPageSize, newPage);
    }

    this.setStateWithData({
      pageSize: newPageSize,
      page: newPage
    }, function () {
      _this4.fireOnChange();
    });
  },
  sortColumn: function sortColumn(column, additive) {
    var _this5 = this;

    var _getResolvedState2 = this.getResolvedState();

    var sorting = _getResolvedState2.sorting;
    var onSortingChange = this.props.onSortingChange;

    if (onSortingChange) {
      return onSortingChange(column, additive);
    }
    var newSorting = _utils2.default.clone(sorting || []).map(function (d) {
      d.desc = _utils2.default.isSortingDesc(d);
      return d;
    });
    if (!_utils2.default.isArray(column)) {
      // Single-Sort
      var existingIndex = newSorting.findIndex(function (d) {
        return d.id === column.id;
      });
      if (existingIndex > -1) {
        var existing = newSorting[existingIndex];
        if (existing.desc) {
          if (additive) {
            newSorting.splice(existingIndex, 1);
          } else {
            existing.desc = false;
            newSorting = [existing];
          }
        } else {
          existing.desc = true;
          if (!additive) {
            newSorting = [existing];
          }
        }
      } else {
        if (additive) {
          newSorting.push({
            id: column.id,
            desc: false
          });
        } else {
          newSorting = [{
            id: column.id,
            desc: false
          }];
        }
      }
    } else {
      // Multi-Sort
      var _existingIndex = newSorting.findIndex(function (d) {
        return d.id === column[0].id;
      });
      // Existing Sorted Column
      if (_existingIndex > -1) {
        var _existing = newSorting[_existingIndex];
        if (_existing.desc) {
          if (additive) {
            newSorting.splice(_existingIndex, column.length);
          } else {
            column.forEach(function (d, i) {
              newSorting[_existingIndex + i].desc = false;
            });
          }
        } else {
          column.forEach(function (d, i) {
            newSorting[_existingIndex + i].desc = true;
          });
        }
        if (!additive) {
          newSorting = newSorting.slice(_existingIndex, column.length);
        }
      } else {
        // New Sort Column
        if (additive) {
          newSorting = newSorting.concat(column.map(function (d) {
            return {
              id: d.id,
              desc: false
            };
          }));
        } else {
          newSorting = column.map(function (d) {
            return {
              id: d.id,
              desc: false
            };
          });
        }
      }
    }
    this.setStateWithData({
      page: !sorting.length && newSorting.length || !additive ? 0 : this.state.page,
      sorting: newSorting
    }, function () {
      _this5.fireOnChange();
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbImdldERhdGFNb2RlbCIsIm5ld1N0YXRlIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJTdWJDb21wb25lbnQiLCJwYWdlIiwicGFnZXMiLCJwYWdlU2l6ZSIsImhhc0hlYWRlckdyb3VwcyIsImZvckVhY2giLCJjb2x1bW4iLCJoZWFkZXJHcm91cHMiLCJjdXJyZW50U3BhbiIsImFkZEhlYWRlciIsInB1c2giLCJwcm9wcyIsIm5vU3ViRXhwYW5kZXJDb2x1bW5zIiwibWFwIiwiY29sIiwiZmlsdGVyIiwiZCIsImV4cGFuZGVyIiwidW5kZWZpbmVkIiwiZXhwYW5kZXJDb2x1bW5JbmRleCIsImZpbmRJbmRleCIsIm5lZWRzRXhwYW5kZXIiLCJsZW5ndGgiLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwibWFrZURlY29yYXRlZENvbHVtbiIsImRjb2wiLCJ3aWR0aCIsImFjY2Vzc29yIiwiaWQiLCJhY2Nlc3NvclN0cmluZyIsImdldCIsInJvdyIsImNvbnNvbGUiLCJ3YXJuIiwiRXJyb3IiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiZGVjb3JhdGVBbmRBZGRUb0FsbCIsImRlY29yYXRlZENvbHVtbiIsImFsbERlY29yYXRlZENvbHVtbnMiLCJkZWNvcmF0ZWRDb2x1bW5zIiwiaSIsInZpc2libGVDb2x1bW5zIiwic2xpY2UiLCJhbGxWaXNpYmxlQ29sdW1ucyIsInZpc2libGVTdWJDb2x1bW5zIiwiaW5kZXhPZiIsImdldEZpcnN0RGVmaW5lZCIsInNob3ciLCJwaXZvdENvbHVtbnMiLCJwaXZvdENvbHVtbiIsImNvbmNhdCIsInJlc29sdmVkRGF0YSIsIl9fb3JpZ2luYWwiLCJfX2luZGV4IiwiYWdncmVnYXRlIiwicm93cyIsImFnZ3JlZ2F0aW9uVmFsdWVzIiwiYWdncmVnYXRpbmdDb2x1bW5zIiwidmFsdWVzIiwic3RhbmRhcmRDb2x1bW5zIiwiZ3JvdXBSZWN1cnNpdmVseSIsImtleXMiLCJncm91cGVkUm93cyIsIk9iamVjdCIsImVudHJpZXMiLCJncm91cEJ5Iiwia2V5IiwidmFsdWUiLCJzdWJSb3dzIiwicm93R3JvdXAiLCJuZXdQYWdlcyIsIk1hdGgiLCJjZWlsIiwibmV3UGFnZSIsIm1heCIsImdldFNvcnRlZERhdGEiLCJyZXNvbHZlZFN0YXRlIiwibWFudWFsIiwic29ydGluZyIsInNvcnRlZERhdGEiLCJzb3J0RGF0YSIsImZpcmVPbkNoYW5nZSIsIm9uQ2hhbmdlIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImdldFByb3BPclN0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZU9yUHJvcCIsInNvcnRlZCIsIm9yZGVyQnkiLCJzb3J0IiwiSW5maW5pdHkiLCJ0b0xvd2VyQ2FzZSIsImRlc2MiLCJnZXRNaW5Sb3dzIiwibWluUm93cyIsIm9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWRSb3dzIiwic2V0U3RhdGVXaXRoRGF0YSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJuZXdQYWdlU2l6ZSIsImN1cnJlbnRSb3ciLCJmbG9vciIsInNvcnRDb2x1bW4iLCJhZGRpdGl2ZSIsIm9uU29ydGluZ0NoYW5nZSIsIm5ld1NvcnRpbmciLCJjbG9uZSIsImlzU29ydGluZ0Rlc2MiLCJpc0FycmF5IiwiZXhpc3RpbmdJbmRleCIsImV4aXN0aW5nIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7a0JBRWU7QUFDYkEsY0FEYSx3QkFDQ0MsUUFERCxFQUNXO0FBQUE7O0FBQUEsUUFFcEJDLE9BRm9CLEdBYWxCRCxRQWJrQixDQUVwQkMsT0FGb0I7QUFBQSw0QkFhbEJELFFBYmtCLENBR3BCRSxPQUhvQjtBQUFBLFFBR3BCQSxPQUhvQixxQ0FHVixFQUhVO0FBQUEsUUFJcEJDLElBSm9CLEdBYWxCSCxRQWJrQixDQUlwQkcsSUFKb0I7QUFB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R0FBcUMsSUFBckM7QUFDRCxXQUZEO0FBR0Q7QUFDRCxZQUFJLENBQUNZLFFBQUwsRUFBZTtBQUNiRSx1QkFBYUEsV0FBV2hFLEtBQVgsQ0FBaUJvRSxjQUFqQixFQUFnQ3pHLE9BQU9nQixNQUF2QyxDQUFiO0FBQ0Q7QUFDRixPQWxCRCxNQWtCTztBQUNMO0FBQ0EsWUFBSW1GLFFBQUosRUFBYztBQUNaRSx1QkFBYUEsV0FBV3hELE1BQVgsQ0FBa0I3QyxPQUFPTyxHQUFQLENBQVc7QUFBQSxtQkFBTTtBQUM5Q2Usa0JBQUlaLEVBQUVZLEVBRHdDO0FBRTlDaUUsb0JBQU07QUFGd0MsYUFBTjtBQUFBLFdBQVgsQ0FBbEIsQ0FBYjtBQUlELFNBTEQsTUFLTztBQUNMYyx1QkFBYXJHLE9BQU9PLEdBQVAsQ0FBVztBQUFBLG1CQUFNO0FBQzVCZSxrQkFBSVosRUFBRVksRUFEc0I7QUFFNUJpRSxvQkFBTTtBQUZzQixhQUFOO0FBQUEsV0FBWCxDQUFiO0FBSUQ7QUFDRjtBQUNGO0FBQ0QsU0FBS00sZ0JBQUwsQ0FBc0I7QUFDcEJsRyxZQUFRLENBQUM4RSxRQUFRekQsTUFBVCxJQUFtQnFGLFdBQVdyRixNQUEvQixJQUEwQyxDQUFDbUYsUUFBNUMsR0FBd0QsQ0FBeEQsR0FBNEQsS0FBS25CLEtBQUwsQ0FBV3JGLElBRHpEO0FBRXBCOEUsZUFBUzRCO0FBRlcsS0FBdEIsRUFHRyxZQUFNO0FBQ1AsYUFBS3pCLFlBQUw7QUFDRCxLQUxEO0FBTUQ7QUE5WVksQyIsImZpbGUiOiJtZXRob2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXREYXRhTW9kZWwgKG5ld1N0YXRlKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sdW1ucyxcbiAgICAgIHBpdm90QnkgPSBbXSxcbiAgICAgIGRhdGEsXG4gICAgICBwaXZvdElES2V5LFxuICAgICAgcGl2b3RWYWxLZXksXG4gICAgICBzdWJSb3dzS2V5LFxuICAgICAgZXhwYW5kZXJDb2x1bW5XaWR0aCxcbiAgICAgIFN1YkNvbXBvbmVudCxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdlcyxcbiAgICAgIHBhZ2VTaXplXG4gICAgfSA9IG5ld1N0YXRlXG5cbiAgICAvLyBEZXRlcm1pbmUgSGVhZGVyIEdyb3Vwc1xuICAgIGxldCBoYXNIZWFkZXJHcm91cHMgPSBmYWxzZVxuICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIGhhc0hlYWRlckdyb3VwcyA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQnVpbGQgSGVhZGVyIEdyb3Vwc1xuICAgIGNvbnN0IGhlYWRlckdyb3VwcyA9IFtdXG4gICAgbGV0IGN1cnJlbnRTcGFuID0gW11cblxuICAgIC8vIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gYWRkIGEgaGVhZGVyIGFuZCByZXNldCB0aGUgY3VycmVudFNwYW5cbiAgICBjb25zdCBhZGRIZWFkZXIgPSAoY29sdW1ucywgY29sdW1uID0gY29sdW1uc1swXSkgPT4ge1xuICAgICAgaGVhZGVyR3JvdXBzLnB1c2goe1xuICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9KVxuICAgICAgY3VycmVudFNwYW4gPSBbXVxuICAgIH1cblxuICAgIGNvbnN0IG5vU3ViRXhwYW5kZXJDb2x1bW5zID0gY29sdW1ucy5tYXAoY29sID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbCxcbiAgICAgICAgY29sdW1uczogY29sLmNvbHVtbnMgPyBjb2wuY29sdW1ucy5maWx0ZXIoZCA9PiAhZC5leHBhbmRlcikgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IGV4cGFuZGVyQ29sdW1uSW5kZXggPSBjb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLmV4cGFuZGVyKVxuICAgIGNvbnN0IG5lZWRzRXhwYW5kZXIgPSAoU3ViQ29tcG9uZW50IHx8IHBpdm90QnkubGVuZ3RoKSAmJiBleHBhbmRlckNvbHVtbkluZGV4ID09PSAtMVxuICAgIGNvbnN0IGNvbHVtbnNXaXRoRXhwYW5kZXIgPSBuZWVkc0V4cGFuZGVyID8gW3tleHBhbmRlcjogdHJ1ZX0sIC4uLm5vU3ViRXhwYW5kZXJDb2x1bW5zXSA6IG5vU3ViRXhwYW5kZXJDb2x1bW5zXG4gICAgaWYgKG5lZWRzRXhwYW5kZXIpIHtcbiAgICAgIGV4cGFuZGVyQ29sdW1uSW5kZXggPSAwXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZURlY29yYXRlZENvbHVtbiA9IChjb2x1bW4pID0+IHtcbiAgICAgIGNvbnN0IGRjb2wgPSB7XG4gICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAuLi5jb2x1bW5cbiAgICAgIH1cblxuICAgICAgaWYgKGRjb2wuZXhwYW5kZXIpIHtcbiAgICAgICAgZGNvbC53aWR0aCA9IGV4cGFuZGVyQ29sdW1uV2lkdGhcbiAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xuICAgICAgICBkY29sLmlkID0gZGNvbC5pZCB8fCBkY29sLmFjY2Vzc29yXG4gICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxuICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXG4gICAgICAgIHJldHVybiBkY29sXG4gICAgICB9XG5cbiAgICAgIGlmIChkY29sLmFjY2Vzc29yICYmICFkY29sLmlkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgY29sdW1uIGlkIGlzIHJlcXVpcmVkIGlmIHVzaW5nIGEgbm9uLXN0cmluZyBhY2Nlc3NvciBmb3IgY29sdW1uIGFib3ZlLicpXG4gICAgICB9XG5cbiAgICAgIGlmICghZGNvbC5hY2Nlc3Nvcikge1xuICAgICAgICBkY29sLmFjY2Vzc29yID0gZCA9PiB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIG1pbldpZHRoIGlzIG5vdCBncmVhdGVyIHRoYW4gbWF4V2lkdGggaWYgc2V0XG4gICAgICBpZiAoZGNvbC5tYXhXaWR0aCA8IGRjb2wubWluV2lkdGgpIHtcbiAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRjb2xcbiAgICB9XG5cbiAgICAvLyBEZWNvcmF0ZSB0aGUgY29sdW1uc1xuICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sKSA9PiB7XG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW4gPSBtYWtlRGVjb3JhdGVkQ29sdW1uKGNvbClcbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXG4gICAgICByZXR1cm4gZGVjb3JhdGVkQ29sdW1uXG4gICAgfVxuICAgIGxldCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cbiAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gY29sdW1uc1dpdGhFeHBhbmRlci5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbi5jb2x1bW5zLm1hcChkZWNvcmF0ZUFuZEFkZFRvQWxsKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcbiAgICBsZXQgdmlzaWJsZUNvbHVtbnMgPSBkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKClcbiAgICBsZXQgYWxsVmlzaWJsZUNvbHVtbnMgPSBbXVxuXG4gICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKGQgPT4gcGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2x1bW5cbiAgICB9KVxuXG4gICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IHtcbiAgICAgIHJldHVybiBjb2x1bW4uY29sdW1ucyA/IGNvbHVtbi5jb2x1bW5zLmxlbmd0aCA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBNb3ZlIHRoZSBwaXZvdCBjb2x1bW5zIGludG8gYSBzaW5nbGUgY29sdW1uIGlmIG5lZWRlZFxuICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgcGl2b3RDb2x1bW5zID0gW11cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRGVjb3JhdGVkQ29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGl2b3RCeS5pbmRleE9mKGFsbERlY29yYXRlZENvbHVtbnNbaV0uaWQpID4gLTEpIHtcbiAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChhbGxEZWNvcmF0ZWRDb2x1bW5zW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBwaXZvdENvbHVtbiA9IHtcbiAgICAgICAgLi4ucGl2b3RDb2x1bW5zWzBdLFxuICAgICAgICBwaXZvdENvbHVtbnMsXG4gICAgICAgIGV4cGFuZGVyOiB0cnVlXG4gICAgICB9XG4gICAgICB2aXNpYmxlQ29sdW1uc1tleHBhbmRlckNvbHVtbkluZGV4XSA9IHBpdm90Q29sdW1uXG4gICAgfVxuXG4gICAgLy8gQnVpbGQgZmxhc3QgbGlzdCBvZiBhbGxWaXNpYmxlQ29sdW1ucyBhbmQgSGVhZGVyR3JvdXBzXG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PiB7XG4gICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMgPSBhbGxWaXNpYmxlQ29sdW1ucy5jb25jYXQoY29sdW1uLmNvbHVtbnMpXG4gICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgICB9XG4gICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxuICAgICAgY3VycmVudFNwYW4ucHVzaChjb2x1bW4pXG4gICAgfSlcbiAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcbiAgICB9XG5cbiAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcbiAgICBsZXQgcmVzb2x2ZWREYXRhID0gZGF0YS5tYXAoKGQsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAgX19vcmlnaW5hbDogZCxcbiAgICAgICAgX19pbmRleDogaVxuICAgICAgfVxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxuICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxuICAgICAgfSlcbiAgICAgIHJldHVybiByb3dcbiAgICB9KVxuXG4gICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXG4gICAgY29uc3QgYWdncmVnYXRlID0gKHJvd3MpID0+IHtcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW9uVmFsdWVzID0ge31cbiAgICAgIGFnZ3JlZ2F0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxuICAgICAgICBhZ2dyZWdhdGlvblZhbHVlc1tjb2x1bW4uaWRdID0gY29sdW1uLmFnZ3JlZ2F0ZSh2YWx1ZXMsIHJvd3MpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXG4gICAgfVxuICAgIGxldCBzdGFuZGFyZENvbHVtbnMgPSBwaXZvdEJ5Lmxlbmd0aCA/IGFsbFZpc2libGVDb2x1bW5zLnNsaWNlKDEpIDogYWxsVmlzaWJsZUNvbHVtbnNcbiAgICBjb25zdCBhZ2dyZWdhdGluZ0NvbHVtbnMgPSBzdGFuZGFyZENvbHVtbnMuZmlsdGVyKGQgPT4gZC5hZ2dyZWdhdGUpXG4gICAgbGV0IHBpdm90Q29sdW1uXG4gICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICBwaXZvdENvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zWzBdXG4gICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgbGV2ZWwsIGp1c3QgcmV0dXJuIHRoZSByb3dzXG4gICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiByb3dzXG4gICAgICAgIH1cbiAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcbiAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXG4gICAgICAgICAgXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKVxuICAgICAgICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW3Bpdm90SURLZXldOiBrZXlzW2ldLFxuICAgICAgICAgICAgICAgIFtwaXZvdFZhbEtleV06IGtleSxcbiAgICAgICAgICAgICAgICBba2V5c1tpXV06IGtleSxcbiAgICAgICAgICAgICAgICBbc3ViUm93c0tleV06IHZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAvLyBSZWN1cnNlIGludG8gdGhlIHN1YlJvd3NcbiAgICAgICAgZ3JvdXBlZFJvd3MgPSBncm91cGVkUm93cy5tYXAocm93R3JvdXAgPT4ge1xuICAgICAgICAgIGxldCBzdWJSb3dzID0gZ3JvdXBSZWN1cnNpdmVseShyb3dHcm91cFtzdWJSb3dzS2V5XSwga2V5cywgaSArIDEpXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJvd0dyb3VwLFxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiBzdWJSb3dzLFxuICAgICAgICAgICAgLi4uYWdncmVnYXRlKHN1YlJvd3MpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZ3JvdXBlZFJvd3NcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkRGF0YSA9IGdyb3VwUmVjdXJzaXZlbHkocmVzb2x2ZWREYXRhLCBwaXZvdEJ5KVxuICAgIH1cblxuICAgIGNvbnN0IG5ld1BhZ2VzID0gXy5nZXRGaXJzdERlZmluZWQocGFnZXMsIE1hdGguY2VpbChyZXNvbHZlZERhdGEubGVuZ3RoIC8gcGFnZVNpemUpKVxuICAgIGNvbnN0IG5ld1BhZ2UgPSBwYWdlID4gbmV3UGFnZXMgPyBuZXdQYWdlIC0gMSA6IHBhZ2VcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5uZXdTdGF0ZSxcbiAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgIHBpdm90Q29sdW1uLFxuICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICBoZWFkZXJHcm91cHMsXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgaGFzSGVhZGVyR3JvdXBzLFxuICAgICAgcGFnZTogTWF0aC5tYXgobmV3UGFnZSwgMClcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRlZERhdGEgKHJlc29sdmVkU3RhdGUpIHtcbiAgICBjb25zdCB7XG4gICAgICBtYW51YWwsXG4gICAgICBzb3J0aW5nLFxuICAgICAgcmVzb2x2ZWREYXRhXG4gICAgfSA9IHJlc29sdmVkU3RhdGVcblxuICAgIC8vIFJlc29sdmUgdGhlIGRhdGEgZnJvbSBlaXRoZXIgbWFudWFsIGRhdGEgb3Igc29ydGVkIGRhdGFcbiAgICByZXR1cm4ge1xuICAgICAgc29ydGVkRGF0YTogbWFudWFsID8gcmVzb2x2ZWREYXRhIDogdGhpcy5zb3J0RGF0YShyZXNvbHZlZERhdGEsIHNvcnRpbmcpXG4gICAgfVxuICB9LFxuXG4gIGZpcmVPbkNoYW5nZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmdldFJlc29sdmVkU3RhdGUoKSwgdGhpcylcbiAgfSxcbiAgZ2V0UHJvcE9yU3RhdGUgKGtleSkge1xuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzW2tleV0sIHRoaXMuc3RhdGVba2V5XSlcbiAgfSxcbiAgZ2V0U3RhdGVPclByb3AgKGtleSkge1xuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnN0YXRlW2tleV0sIHRoaXMucHJvcHNba2V5XSlcbiAgfSxcbiAgc29ydERhdGEgKGRhdGEsIHNvcnRpbmcpIHtcbiAgICBpZiAoIXNvcnRpbmcubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgICBjb25zdCBzb3J0ZWQgPSBfLm9yZGVyQnkoZGF0YSwgc29ydGluZy5tYXAoc29ydCA9PiB7XG4gICAgICByZXR1cm4gcm93ID0+IHtcbiAgICAgICAgaWYgKHJvd1tzb3J0LmlkXSA9PT0gbnVsbCB8fCByb3dbc29ydC5pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiAtSW5maW5pdHlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIHJvd1tzb3J0LmlkXSA9PT0gJ3N0cmluZycgPyByb3dbc29ydC5pZF0udG9Mb3dlckNhc2UoKSA6IHJvd1tzb3J0LmlkXVxuICAgICAgfVxuICAgIH0pLCBzb3J0aW5nLm1hcChkID0+ICFkLmRlc2MpKVxuXG4gICAgcmV0dXJuIHNvcnRlZC5tYXAocm93ID0+IHtcbiAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucm93LFxuICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5zb3J0RGF0YShyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSwgc29ydGluZylcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGdldE1pblJvd3MgKCkge1xuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXG4gIH0sXG5cbiAgLy8gVXNlciBhY3Rpb25zXG4gIG9uUGFnZUNoYW5nZSAocGFnZSkge1xuICAgIGNvbnN0IHsgb25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuICAgIGlmIChvblBhZ2VDaGFuZ2UpIHtcbiAgICAgIHJldHVybiBvblBhZ2VDaGFuZ2UocGFnZSlcbiAgICB9XG4gICAgY29uc3QgbmV3U3RhdGUgPSB7IHBhZ2UgfVxuICAgIGlmIChjb2xsYXBzZU9uUGFnZUNoYW5nZSkge1xuICAgICAgbmV3U3RhdGUuZXhwYW5kZWRSb3dzID0ge31cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgbmV3U3RhdGVcbiAgICAsICgpID0+IHtcbiAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcbiAgICB9KVxuICB9LFxuICBvblBhZ2VTaXplQ2hhbmdlIChuZXdQYWdlU2l6ZSkge1xuICAgIGNvbnN0IHsgb25QYWdlU2l6ZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2UgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhZ2UgdG8gZGlzcGxheVxuICAgIGNvbnN0IGN1cnJlbnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXG5cbiAgICBpZiAob25QYWdlU2l6ZUNoYW5nZSkge1xuICAgICAgcmV0dXJuIG9uUGFnZVNpemVDaGFuZ2UobmV3UGFnZVNpemUsIG5ld1BhZ2UpXG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgIHBhZ2VTaXplOiBuZXdQYWdlU2l6ZSxcbiAgICAgIHBhZ2U6IG5ld1BhZ2VcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmZpcmVPbkNoYW5nZSgpXG4gICAgfSlcbiAgfSxcbiAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xuICAgIGNvbnN0IHsgc29ydGluZyB9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcbiAgICBjb25zdCB7IG9uU29ydGluZ0NoYW5nZSB9ID0gdGhpcy5wcm9wc1xuICAgIGlmIChvblNvcnRpbmdDaGFuZ2UpIHtcbiAgICAgIHJldHVybiBvblNvcnRpbmdDaGFuZ2UoY29sdW1uLCBhZGRpdGl2ZSlcbiAgICB9XG4gICAgbGV0IG5ld1NvcnRpbmcgPSBfLmNsb25lKHNvcnRpbmcgfHwgW10pLm1hcChkID0+IHtcbiAgICAgIGQuZGVzYyA9IF8uaXNTb3J0aW5nRGVzYyhkKVxuICAgICAgcmV0dXJuIGRcbiAgICB9KVxuICAgIGlmICghXy5pc0FycmF5KGNvbHVtbikpIHtcbiAgICAgIC8vIFNpbmdsZS1Tb3J0XG4gICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGluZy5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGluZ1tleGlzdGluZ0luZGV4XVxuICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYykge1xuICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGluZy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTb3J0aW5nID0gW2V4aXN0aW5nXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGlzdGluZy5kZXNjID0gdHJ1ZVxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmcgPSBbZXhpc3RpbmddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICBuZXdTb3J0aW5nLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0aW5nID0gW3tcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTXVsdGktU29ydFxuICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRpbmcuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxuICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleF1cbiAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MpIHtcbiAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmcuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XG4gICAgICAgICAgbmV3U29ydGluZyA9IG5ld1NvcnRpbmcuc2xpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmV3IFNvcnQgQ29sdW1uXG4gICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRpbmcgPSBuZXdTb3J0aW5nLmNvbmNhdChjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgZGVzYzogZmFsc2VcbiAgICAgICAgICB9KSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U29ydGluZyA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICBwYWdlOiAoKCFzb3J0aW5nLmxlbmd0aCAmJiBuZXdTb3J0aW5nLmxlbmd0aCkgfHwgIWFkZGl0aXZlKSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICBzb3J0aW5nOiBuZXdTb3J0aW5nXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5maXJlT25DaGFuZ2UoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==