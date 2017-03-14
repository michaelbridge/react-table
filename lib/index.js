'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactTableDefaults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _lifecycle = require('./lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactTableDefaults = exports.ReactTableDefaults = _defaultProps2.default;

exports.default = _react2.default.createClass(_extends({
  displayName: 'src'
}, _lifecycle2.default, _methods2.default, {
  render: function render() {
    var _this = this;

    var resolvedState = this.getResolvedState();
    var children = resolvedState.children;
    var className = resolvedState.className;
    var style = resolvedState.style;
    var getProps = resolvedState.getProps;
    var getTableProps = resolvedState.getTableProps;
    var getTheadGroupProps = resolvedState.getTheadGroupProps;
    var getTheadGroupTrProps = resolvedState.getTheadGroupTrProps;
    var getTheadGroupThProps = resolvedState.getTheadGroupThProps;
    var getTheadProps = resolvedState.getTheadProps;
    var getTheadTrProps = resolvedState.getTheadTrProps;
    var getTheadThProps = resolvedState.getTheadThProps;
    var getTbodyProps = resolvedState.getTbodyProps;
    var getTrGroupProps = resolvedState.getTrGroupProps;
    var getTrProps = resolvedState.getTrProps;
    var getTdProps = resolvedState.getTdProps;
    var getTfootProps = resolvedState.getTfootProps;
    var getTfootTrProps = resolvedState.getTfootTrProps;
    var getTfootTdProps = resolvedState.getTfootTdProps;
    var getPaginationProps = resolvedState.getPaginationProps;
    var getLoadingProps = resolvedState.getLoadingProps;
    var getNoDataProps = resolvedState.getNoDataProps;
    var showPagination = resolvedState.showPagination;
    var expanderColumnWidth = resolvedState.expanderColumnWidth;
    var manual = resolvedState.manual;
    var loadingText = resolvedState.loadingText;
    var noDataText = resolvedState.noDataText;
    var loading = resolvedState.loading;
    var pageSize = resolvedState.pageSize;
    var page = resolvedState.page;
    var sorting = resolvedState.sorting;
    var pages = resolvedState.pages;
    var pivotValKey = resolvedState.pivotValKey;
    var subRowsKey = resolvedState.subRowsKey;
    var expandedRows = resolvedState.expandedRows;
    var onExpandRow = resolvedState.onExpandRow;
    var TableComponent = resolvedState.TableComponent;
    var TheadComponent = resolvedState.TheadComponent;
    var TbodyComponent = resolvedState.TbodyComponent;
    var TrGroupComponent = resolvedState.TrGroupComponent;
    var TrComponent = resolvedState.TrComponent;
    var ThComponent = resolvedState.ThComponent;
    var TdComponent = resolvedState.TdComponent;
    var TfootComponent = resolvedState.TfootComponent;
    var ExpanderComponent = resolvedState.ExpanderComponent;
    var PaginationComponent = resolvedState.PaginationComponent;
    var LoadingComponent = resolvedState.LoadingComponent;
    var SubComponent = resolvedState.SubComponent;
    var NoDataComponent = resolvedState.NoDataComponent;
    var resolvedData = resolvedState.resolvedData;
    var allVisibleColumns = resolvedState.allVisibleColumns;
    var headerGroups = resolvedState.headerGroups;
    var hasHeaderGroups = resolvedState.hasHeaderGroups;
    var sortedData = resolvedState.sortedData;

    // Pagination

    var startRow = pageSize * page;
    var endRow = startRow + pageSize;
    var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
    var minRows = this.getMinRows();
    var padRows = pages > 1 ? _utils2.default.range(pageSize - pageRows.length) : minRows ? _utils2.default.range(Math.max(minRows - pageRows.length, 0)) : [];

    var hasColumnFooter = allVisibleColumns.some(function (d) {
      return d.footer;
    });

    var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      rows.forEach(function (row, i) {
        index++;
        row._viewIndex = index;
        var newPath = path.concat([i]);
        if (row[subRowsKey] && _utils2.default.get(expandedRows, newPath)) {
          index = recurseRowsViewIndex(row[subRowsKey], newPath, index);
        }
      });
      return index;
    };

    recurseRowsViewIndex(pageRows);

    var canPrevious = page > 0;
    var canNext = page + 1 < pages;

    var rowMinWidth = _utils2.default.sum(allVisibleColumns.map(function (d) {
      return _utils2.default.getFirstDefined(d.width, d.minWidth);
    }));

    var rowIndex = -1;

    var finalState = _extends({}, resolvedState, {
      startRow: startRow,
      endRow: endRow,
      pageRows: pageRows,
      minRows: minRows,
      padRows: padRows,
      hasColumnFooter: hasColumnFooter,
      canPrevious: canPrevious,
      canNext: canNext,
      rowMinWidth: rowMinWidth
    });

    // Visual Components

    var makeHeaderGroups = function makeHeaderGroups() {
      var theadGroupProps = _utils2.default.splitProps(getTheadGroupProps(finalState, undefined, undefined, _this));
      var theadGroupTrProps = _utils2.default.splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-headerGroups', theadGroupProps.className),
          style: _extends({}, theadGroupProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadGroupProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadGroupTrProps.className,
            style: theadGroupTrProps.style
          }, theadGroupTrProps.rest),
          headerGroups.map(makeHeaderGroup)
        )
      );
    };

    var makeHeaderGroup = function makeHeaderGroup(column, i) {
      var flex = _utils2.default.sum(column.columns.map(function (d) {
        return d.width ? 0 : d.minWidth;
      }));
      var width = _utils2.default.sum(column.columns.map(function (d) {
        return _utils2.default.getFirstDefined(d.width, d.minWidth);
      }));
      var maxWidth = _utils2.default.sum(column.columns.map(function (d) {
        return _utils2.default.getFirstDefined(d.width, d.maxWidth);
      }));
      var theadGroupThProps = _utils2.default.splitProps(getTheadGroupThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

      var flexStyles = {
        flex: flex + ' 0 auto',
        width: width + 'px',
        maxWidth: maxWidth + 'px'
      };

      if (column.expander) {
        if (column.pivotColumns) {
          return _react2.default.createElement(ThComponent, _extends({
            key: i,
            className: (0, _classnames2.default)('rt-pivot-header', classes),
            style: _extends({}, styles, flexStyles)
          }, rest));
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }
      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes),
          style: _extends({}, styles, flexStyles)
        }, rest),
        _utils2.default.normalizeComponent(column.header, {
          data: sortedData,
          column: column
        })
      );
    };

    var makeHeaders = function makeHeaders() {
      var theadProps = _utils2.default.splitProps(getTheadProps(finalState, undefined, undefined, _this));
      var theadTrProps = _utils2.default.splitProps(getTheadTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-header', theadProps.className),
          style: _extends({}, theadProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadTrProps.className,
            style: theadTrProps.style
          }, theadTrProps.rest),
          allVisibleColumns.map(makeHeader)
        )
      );
    };

    var makeHeader = function makeHeader(column, i) {
      var sort = sorting.find(function (d) {
        return d.id === column.id;
      });
      var show = typeof column.show === 'function' ? column.show() : column.show;
      var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
      var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
      var theadThProps = _utils2.default.splitProps(getTheadThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

      if (column.expander) {
        if (column.pivotColumns) {
          var pivotSort = sorting.find(function (d) {
            return d.id === column.id;
          });
          return _react2.default.createElement(
            ThComponent,
            _extends({
              key: i,
              className: (0, _classnames2.default)('rt-pivot-header', column.sortable && '-cursor-pointer', classes, pivotSort ? pivotSort.desc ? '-sort-asc' : '-sort-desc' : ''),
              style: _extends({}, styles, {
                flex: width + ' 0 auto',
                width: width + 'px',
                maxWidth: maxWidth + 'px'
              }),
              toggleSort: function toggleSort(e) {
                column.sortable && _this.sortColumn(column.pivotColumns, e.shiftKey);
              }
            }, rest),
            column.pivotColumns.map(function (pivotColumn, i) {
              return _react2.default.createElement(
                'span',
                { key: pivotColumn.id },
                _utils2.default.normalizeComponent(pivotColumn.header, {
                  data: sortedData,
                  column: column
                }),
                i < column.pivotColumns.length - 1 && _react2.default.createElement(ExpanderComponent, null)
              );
            })
          );
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }

      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes, sort ? sort.desc ? '-sort-asc' : '-sort-desc' : '', column.sortable && '-cursor-pointer', !show && '-hidden'),
          style: _extends({}, styles, {
            flex: width + ' 0 auto',
            width: width + 'px',
            maxWidth: maxWidth + 'px'
          }),
          toggleSort: function toggleSort(e) {
            column.sortable && _this.sortColumn(column, e.shiftKey);
          }
        }, rest),
        _utils2.default.normalizeComponent(column.header, {
          data: sortedData,
          column: column
        })
      );
    };

    var makePageRow = function makePageRow(row, i) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var rowInfo = {
        row: row.__original,
        rowValues: row,
        index: row.__index,
        viewIndex: ++rowIndex,
        level: path.length,
        nestingPath: path.concat([i]),
        aggregated: !!row[subRowsKey],
        subRows: row[subRowsKey]
      };
      var isExpanded = _utils2.default.get(expandedRows, rowInfo.nestingPath);
      var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, rowInfo, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: rowInfo.nestingPath.join('_')
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
            style: trProps.style
          }, trProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, rowInfo, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, rowInfo, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            if (column.expander) {
              var onTdClick = function onTdClick(e) {
                if (onExpandRow) {
                  return onExpandRow(rowInfo.nestingPath, e);
                }
                var newExpandedRows = _utils2.default.clone(expandedRows);
                if (isExpanded) {
                  return _this.setStateWithData({
                    expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, false)
                  });
                }
                return _this.setStateWithData({
                  expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, {})
                });
              };

              if (column.pivotColumns) {
                // Return the pivot expander cell
                var PivotCell = column.pivotRender;
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      paddingLeft: rowInfo.nestingPath.length === 1 ? undefined : 30 * (rowInfo.nestingPath.length - 1) + 'px',
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, tdProps.rest, {
                    onClick: onTdClick
                  }),
                  rowInfo.subRows ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    }),
                    column && column.pivotRender ? _react2.default.createElement(PivotCell, _extends({}, rowInfo, {
                      value: rowInfo.rowValues[pivotValKey]
                    })) : _react2.default.createElement(
                      'span',
                      null,
                      row[pivotValKey],
                      ' (',
                      rowInfo.subRows.length,
                      ')'
                    )
                  ) : SubComponent ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    })
                  ) : null
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(
                TdComponent,
                {
                  key: i2,
                  className: (0, _classnames2.default)(classes, { hidden: !show }),
                  style: _extends({}, styles, {
                    flex: '0 0 auto',
                    width: expanderColumnWidth + 'px'
                  }),
                  onClick: onTdClick
                },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(ExpanderComponent, {
                    isExpanded: isExpanded
                  })
                )
              );
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              _utils2.default.normalizeComponent(column.render, _extends({}, rowInfo, {
                value: rowInfo.rowValues[column.id]
              }), rowInfo.rowValues[column.id])
            );
          })
        ),
        rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
          return makePageRow(d, i, rowInfo.nestingPath);
        }),
        SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo)
      );
    };

    var makePadRow = function makePadRow(row, i) {
      var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, undefined, undefined, _this));
      var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: i
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          {
            className: (0, _classnames2.default)('-padRow', trProps.className),
            style: trProps.style || {}
          },
          SubComponent && _react2.default.createElement(ThComponent, _extends({
            className: (0, _classnames2.default)('rt-expander-header', tdProps.className),
            style: _extends({}, tdProps.style, {
              flex: '0 0 auto',
              width: expanderColumnWidth + 'px'
            })
          }, tdProps.rest)),
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              '\xA0'
            );
          })
        )
      );
    };

    var makeColumnFooters = function makeColumnFooters() {
      var tFootProps = getTfootProps(finalState, undefined, undefined, _this);
      var tFootTrProps = _utils2.default.splitProps(getTfootTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TfootComponent,
        _extends({
          className: tFootProps.className,
          style: _extends({}, tFootProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, tFootProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(tFootTrProps.className),
            style: tFootTrProps.style
          }, tFootTrProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tFootTdProps = _utils2.default.splitProps(getTfootTdProps(finalState, undefined, undefined, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));
            var columnFooterProps = _utils2.default.splitProps(column.getFooterProps(finalState, undefined, column, _this));

            var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

            var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

            if (column.expander) {
              if (column.pivotColumns) {
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
                  _utils2.default.normalizeComponent(column.footer)
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(TdComponent, {
                key: i2,
                className: (0, _classnames2.default)(classes, { hidden: !show }),
                style: _extends({}, styles, {
                  flex: '0 0 auto',
                  width: expanderColumnWidth + 'px'
                })
              });
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
              _utils2.default.normalizeComponent(column.footer, {
                data: sortedData,
                column: column
              })
            );
          })
        )
      );
    };

    var rootProps = _utils2.default.splitProps(getProps(finalState, undefined, undefined, this));
    var tableProps = _utils2.default.splitProps(getTableProps(finalState, undefined, undefined, this));
    var tBodyProps = _utils2.default.splitProps(getTbodyProps(finalState, undefined, undefined, this));
    var paginationProps = _utils2.default.splitProps(getPaginationProps(finalState, undefined, undefined, this));
    var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
    var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

    var makeTable = function makeTable() {
      return _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('ReactTable', className, rootProps.className),
          style: _extends({}, style, rootProps.style)
        }, rootProps.rest),
        _react2.default.createElement(
          TableComponent,
          _extends({
            className: (0, _classnames2.default)(tableProps.className),
            style: tableProps.style
          }, tableProps.rest),
          hasHeaderGroups ? makeHeaderGroups() : null,
          makeHeaders(),
          _react2.default.createElement(
            TbodyComponent,
            _extends({
              className: (0, _classnames2.default)(tBodyProps.className),
              style: _extends({}, tBodyProps.style, {
                minWidth: rowMinWidth + 'px'
              })
            }, tBodyProps.rest),
            pageRows.map(function (d, i) {
              return makePageRow(d, i);
            }),
            padRows.map(makePadRow)
          ),
          hasColumnFooter ? makeColumnFooters() : null
        ),
        showPagination ? _react2.default.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this.onPageChange,
          onPageSizeChange: _this.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style
        }, paginationProps.rest)) : null,
        !pageRows.length && _react2.default.createElement(
          NoDataComponent,
          noDataProps,
          _utils2.default.normalizeComponent(noDataText)
        ),
        _react2.default.createElement(LoadingComponent, _extends({
          loading: loading,
          loadingText: loadingText
        }, loadingProps))
      );
    };

    // childProps are optionally passed to a function-as-a-child
    return children ? children(finalState, makeTable, this) : makeTable();
  }
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdFRhYmxlRGVmYXVsdHMiLCJjcmVhdGVDbGFzcyIsInJlbmRlciIsInJlc29sdmVkU3RhdGUiLCJnZXRSZXNvbHZlZFN0YXRlIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwic2hvd1BhZ2luYXRpb24iLCJleHBhbmRlckNvbHVtbldpZHRoIiwibWFudWFsIiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwibG9hZGluZyIsInBhZ2VTaXplIiwicGFnZSIsInNvcnRpbmciLCJwYWdlcyIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVkUm93cyIsIm9uRXhwYW5kUm93IiwiVGFibGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIlN1YkNvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCIsInJlc29sdmVkRGF0YSIsImFsbFZpc2libGVDb2x1bW5zIiwiaGVhZGVyR3JvdXBzIiwiaGFzSGVhZGVyR3JvdXBzIiwic29ydGVkRGF0YSIsInN0YXJ0Um93IiwiZW5kUm93IiwicGFnZVJvd3MiLCJzbGljZSIsIm1pblJvd3MiLCJnZXRNaW5Sb3dzIiwicGFkUm93cyIsInJhbmdlIiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsImhhc0NvbHVtbkZvb3RlciIsInNvbWUiLCJkIiwiZm9vdGVyIiwicmVjdXJzZVJvd3NWaWV3SW5kZXgiLCJyb3dzIiwicGF0aCIsImluZGV4IiwiZm9yRWFjaCIsInJvdyIsImkiLCJfdmlld0luZGV4IiwibmV3UGF0aCIsImNvbmNhdCIsImdldCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsInJvd01pbldpZHRoIiwic3VtIiwibWFwIiwiZ2V0Rmlyc3REZWZpbmVkIiwid2lkdGgiLCJtaW5XaWR0aCIsInJvd0luZGV4IiwiZmluYWxTdGF0ZSIsIm1ha2VIZWFkZXJHcm91cHMiLCJ0aGVhZEdyb3VwUHJvcHMiLCJzcGxpdFByb3BzIiwidW5kZWZpbmVkIiwidGhlYWRHcm91cFRyUHJvcHMiLCJyZXN0IiwibWFrZUhlYWRlckdyb3VwIiwiY29sdW1uIiwiZmxleCIsImNvbHVtbnMiLCJtYXhXaWR0aCIsInRoZWFkR3JvdXBUaFByb3BzIiwiY29sdW1uSGVhZGVyUHJvcHMiLCJnZXRIZWFkZXJQcm9wcyIsImNsYXNzZXMiLCJoZWFkZXJDbGFzc05hbWUiLCJzdHlsZXMiLCJoZWFkZXJTdHlsZSIsImZsZXhTdHlsZXMiLCJleHBhbmRlciIsInBpdm90Q29sdW1ucyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsImhlYWRlciIsImRhdGEiLCJtYWtlSGVhZGVycyIsInRoZWFkUHJvcHMiLCJ0aGVhZFRyUHJvcHMiLCJtYWtlSGVhZGVyIiwic29ydCIsImZpbmQiLCJpZCIsInNob3ciLCJ0aGVhZFRoUHJvcHMiLCJwaXZvdFNvcnQiLCJzb3J0YWJsZSIsImRlc2MiLCJlIiwic29ydENvbHVtbiIsInNoaWZ0S2V5IiwicGl2b3RDb2x1bW4iLCJtYWtlUGFnZVJvdyIsInJvd0luZm8iLCJfX29yaWdpbmFsIiwicm93VmFsdWVzIiwiX19pbmRleCIsInZpZXdJbmRleCIsImxldmVsIiwibmVzdGluZ1BhdGgiLCJhZ2dyZWdhdGVkIiwic3ViUm93cyIsImlzRXhwYW5kZWQiLCJ0ckdyb3VwUHJvcHMiLCJ0clByb3BzIiwiam9pbiIsImkyIiwidGRQcm9wcyIsImNvbHVtblByb3BzIiwib25UZENsaWNrIiwibmV3RXhwYW5kZWRSb3dzIiwiY2xvbmUiLCJzZXRTdGF0ZVdpdGhEYXRhIiwic2V0IiwiUGl2b3RDZWxsIiwicGl2b3RSZW5kZXIiLCJwYWRkaW5nTGVmdCIsImhpZGRlbiIsInZhbHVlIiwibWFrZVBhZFJvdyIsIm1ha2VDb2x1bW5Gb290ZXJzIiwidEZvb3RQcm9wcyIsInRGb290VHJQcm9wcyIsInRGb290VGRQcm9wcyIsImNvbHVtbkZvb3RlclByb3BzIiwiZ2V0Rm9vdGVyUHJvcHMiLCJyb290UHJvcHMiLCJ0YWJsZVByb3BzIiwidEJvZHlQcm9wcyIsInBhZ2luYXRpb25Qcm9wcyIsImxvYWRpbmdQcm9wcyIsIm5vRGF0YVByb3BzIiwibWFrZVRhYmxlIiwib25QYWdlQ2hhbmdlIiwib25QYWdlU2l6ZUNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7O0FBRkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSx3RUFBTjs7a0JBRVEsZ0JBQU1DLFdBQU47QUFBQTtBQUFBO0FBSWJDLFFBSmEsb0JBSUg7QUFBQTs7QUFDUixRQUFNQyxnQkFBZ0IsS0FBS0MsZ0JBQUwsRUFBdEI7QUFEUSxRQUdOQyxRQUhNLEdBNkRKRixhQTdESSxDQUdORSxRQUhNO0FBQUEsUUFJTkMsU0FKTSxHQTZESkgsYUE3REksQ0FJTkcsU0FKTTtBQUFBLFFBS05DLEtBTE0sR0E2REpKLGFBN0RJLENBS05JLEtBTE07QUFBQSxRQU1OQyxRQU5NLEdBNkRKTCxhQTdESSxDQU1OSyxR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QWFpRCxXQUhmO0FBSUUsbUJBQVNDLE9BSlg7QUFLRSx3QkFBYyxNQUFLMEYsWUFMckI7QUFNRSw0QkFBa0IsTUFBS0MsZ0JBTnpCO0FBT0UscUJBQVdMLGdCQUFnQnJLLFNBUDdCO0FBUUUsaUJBQU9xSyxnQkFBZ0JwSztBQVJ6QixXQVNNb0ssZ0JBQWdCeEUsSUFUdEIsRUFERCxHQVlHLElBNUNOO0FBNkNHLFNBQUN2QyxTQUFTTSxNQUFWLElBQ0M7QUFBQyx5QkFBRDtBQUNNMkcscUJBRE47QUFHRywwQkFBRTFELGtCQUFGLENBQXFCckYsVUFBckI7QUFISCxTQTlDSjtBQW9ERSxzQ0FBQyxnQkFBRDtBQUNFLG1CQUFTQyxPQURYO0FBRUUsdUJBQWFGO0FBRmYsV0FHTStJLFlBSE47QUFwREYsT0FEZ0I7QUFBQSxLQUFsQjs7QUE2REE7QUFDQSxXQUFPdkssV0FBV0EsU0FBU3dGLFVBQVQsRUFBcUJpRixTQUFyQixFQUFnQyxJQUFoQyxDQUFYLEdBQW1EQSxXQUExRDtBQUNEO0FBbHdCWSxHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGxpZmVjeWNsZSBmcm9tICcuL2xpZmVjeWNsZSdcbmltcG9ydCBtZXRob2RzIGZyb20gJy4vbWV0aG9kcydcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRQcm9wcydcblxuZXhwb3J0IGNvbnN0IFJlYWN0VGFibGVEZWZhdWx0cyA9IGRlZmF1bHRzXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLi4ubGlmZWN5Y2xlLFxuICAuLi5tZXRob2RzLFxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGdldFByb3BzLFxuICAgICAgZ2V0VGFibGVQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBUclByb3BzLFxuICAgICAgZ2V0VGhlYWRHcm91cFRoUHJvcHMsXG4gICAgICBnZXRUaGVhZFByb3BzLFxuICAgICAgZ2V0VGhlYWRUclByb3BzLFxuICAgICAgZ2V0VGhlYWRUaFByb3BzLFxuICAgICAgZ2V0VGJvZHlQcm9wcyxcbiAgICAgIGdldFRyR3JvdXBQcm9wcyxcbiAgICAgIGdldFRyUHJvcHMsXG4gICAgICBnZXRUZFByb3BzLFxuICAgICAgZ2V0VGZvb3RQcm9wcyxcbiAgICAgIGdldFRmb290VHJQcm9wcyxcbiAgICAgIGdldFRmb290VGRQcm9wcyxcbiAgICAgIGdldFBhZ2luYXRpb25Qcm9wcyxcbiAgICAgIGdldExvYWRpbmdQcm9wcyxcbiAgICAgIGdldE5vRGF0YVByb3BzLFxuICAgICAgc2hvd1BhZ2luYXRpb24sXG4gICAgICBleHBhbmRlckNvbHVtbldpZHRoLFxuICAgICAgbWFudWFsLFxuICAgICAgbG9hZGluZ1RleHQsXG4gICAgICBub0RhdGFUZXh0LFxuICAgICAgLy8gU3RhdGVcbiAgICAgIGxvYWRpbmcsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHBhZ2UsXG4gICAgICBzb3J0aW5nLFxuICAgICAgcGFnZXMsXG4gICAgICAvLyBQaXZvdGluZyBTdGF0ZVxuICAgICAgcGl2b3RWYWxLZXksXG4gICAgICBzdWJSb3dzS2V5LFxuICAgICAgZXhwYW5kZWRSb3dzLFxuICAgICAgb25FeHBhbmRSb3csXG4gICAgICAvLyBDb21wb25lbnRzXG4gICAgICBUYWJsZUNvbXBvbmVudCxcbiAgICAgIFRoZWFkQ29tcG9uZW50LFxuICAgICAgVGJvZHlDb21wb25lbnQsXG4gICAgICBUckdyb3VwQ29tcG9uZW50LFxuICAgICAgVHJDb21wb25lbnQsXG4gICAgICBUaENvbXBvbmVudCxcbiAgICAgIFRkQ29tcG9uZW50LFxuICAgICAgVGZvb3RDb21wb25lbnQsXG4gICAgICBFeHBhbmRlckNvbXBvbmVudCxcbiAgICAgIFBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgICBMb2FkaW5nQ29tcG9uZW50LFxuICAgICAgU3ViQ29tcG9uZW50LFxuICAgICAgTm9EYXRhQ29tcG9uZW50LFxuICAgICAgLy8gRGF0YSBtb2RlbFxuICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICBoZWFkZXJHcm91cHMsXG4gICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICAvLyBTb3J0ZWQgRGF0YVxuICAgICAgc29ydGVkRGF0YVxuICAgIH0gPSByZXNvbHZlZFN0YXRlXG5cbiAgICAvLyBQYWdpbmF0aW9uXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhZ2VTaXplXG4gICAgY29uc3QgcGFnZVJvd3MgPSBtYW51YWwgPyByZXNvbHZlZERhdGEgOiBzb3J0ZWREYXRhLnNsaWNlKHN0YXJ0Um93LCBlbmRSb3cpXG4gICAgY29uc3QgbWluUm93cyA9IHRoaXMuZ2V0TWluUm93cygpXG4gICAgY29uc3QgcGFkUm93cyA9IHBhZ2VzID4gMSA/IF8ucmFuZ2UocGFnZVNpemUgLSBwYWdlUm93cy5sZW5ndGgpXG4gICAgICA6IG1pblJvd3MgPyBfLnJhbmdlKE1hdGgubWF4KG1pblJvd3MgLSBwYWdlUm93cy5sZW5ndGgsIDApKVxuICAgICAgOiBbXVxuXG4gICAgY29uc3QgaGFzQ29sdW1uRm9vdGVyID0gYWxsVmlzaWJsZUNvbHVtbnMuc29tZShkID0+IGQuZm9vdGVyKVxuXG4gICAgY29uc3QgcmVjdXJzZVJvd3NWaWV3SW5kZXggPSAocm93cywgcGF0aCA9IFtdLCBpbmRleCA9IC0xKSA9PiB7XG4gICAgICByb3dzLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBpbmRleCsrXG4gICAgICAgIHJvdy5fdmlld0luZGV4ID0gaW5kZXhcbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGguY29uY2F0KFtpXSlcbiAgICAgICAgaWYgKHJvd1tzdWJSb3dzS2V5XSAmJiBfLmdldChleHBhbmRlZFJvd3MsIG5ld1BhdGgpKSB7XG4gICAgICAgICAgaW5kZXggPSByZWN1cnNlUm93c1ZpZXdJbmRleChyb3dbc3ViUm93c0tleV0sIG5ld1BhdGgsIGluZGV4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgcmVjdXJzZVJvd3NWaWV3SW5kZXgocGFnZVJvd3MpXG5cbiAgICBjb25zdCBjYW5QcmV2aW91cyA9IHBhZ2UgPiAwXG4gICAgY29uc3QgY2FuTmV4dCA9IHBhZ2UgKyAxIDwgcGFnZXNcblxuICAgIGNvbnN0IHJvd01pbldpZHRoID0gXy5zdW0oYWxsVmlzaWJsZUNvbHVtbnMubWFwKGQgPT4gXy5nZXRGaXJzdERlZmluZWQoZC53aWR0aCwgZC5taW5XaWR0aCkpKVxuXG4gICAgbGV0IHJvd0luZGV4ID0gLTFcblxuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSB7XG4gICAgICAuLi5yZXNvbHZlZFN0YXRlLFxuICAgICAgc3RhcnRSb3csXG4gICAgICBlbmRSb3csXG4gICAgICBwYWdlUm93cyxcbiAgICAgIG1pblJvd3MsXG4gICAgICBwYWRSb3dzLFxuICAgICAgaGFzQ29sdW1uRm9vdGVyLFxuICAgICAgY2FuUHJldmlvdXMsXG4gICAgICBjYW5OZXh0LFxuICAgICAgcm93TWluV2lkdGhcbiAgICB9XG5cbiAgICAvLyBWaXN1YWwgQ29tcG9uZW50c1xuXG4gICAgY29uc3QgbWFrZUhlYWRlckdyb3VwcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdGhlYWRHcm91cFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRHcm91cFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZWFkQ29tcG9uZW50XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctaGVhZGVyR3JvdXBzJywgdGhlYWRHcm91cFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnRoZWFkR3JvdXBQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZEdyb3VwUHJvcHMucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGVhZEdyb3VwVHJQcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICBzdHlsZT17dGhlYWRHcm91cFRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRHcm91cFRyUHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aGVhZGVyR3JvdXBzLm1hcChtYWtlSGVhZGVyR3JvdXApfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgIDwvVGhlYWRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUhlYWRlckdyb3VwID0gKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgY29uc3QgZmxleCA9IF8uc3VtKGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IGQud2lkdGggPyAwIDogZC5taW5XaWR0aCkpXG4gICAgICBjb25zdCB3aWR0aCA9IF8uc3VtKGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IF8uZ2V0Rmlyc3REZWZpbmVkKGQud2lkdGgsIGQubWluV2lkdGgpKSlcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5zdW0oY29sdW1uLmNvbHVtbnMubWFwKGQgPT4gXy5nZXRGaXJzdERlZmluZWQoZC53aWR0aCwgZC5tYXhXaWR0aCkpKVxuICAgICAgY29uc3QgdGhlYWRHcm91cFRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRHcm91cFRoUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcblxuICAgICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgICAgY29sdW1uLmhlYWRlckNsYXNzTmFtZSxcbiAgICAgICAgdGhlYWRHcm91cFRoUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW5IZWFkZXJQcm9wcy5jbGFzc05hbWVcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXG4gICAgICAgIC4uLnRoZWFkR3JvdXBUaFByb3BzLnN0eWxlLFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0ID0ge1xuICAgICAgICAuLi50aGVhZEdyb3VwVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZsZXhTdHlsZXMgPSB7XG4gICAgICAgIGZsZXg6IGAke2ZsZXh9IDAgYXV0b2AsXG4gICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICBpZiAoY29sdW1uLnBpdm90Q29sdW1ucykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgJ3J0LXBpdm90LWhlYWRlcicsXG4gICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAuLi5mbGV4U3R5bGVzXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgJ3J0LWV4cGFuZGVyLWhlYWRlcicsXG4gICAgICAgICAgICAgIGNsYXNzZXNcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgLi4uZmxleFN0eWxlc1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmhlYWRlciwge1xuICAgICAgICAgICAgZGF0YTogc29ydGVkRGF0YSxcbiAgICAgICAgICAgIGNvbHVtbjogY29sdW1uXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUhlYWRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0aGVhZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdGhlYWRUclByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkVHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGhlYWRDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1oZWFkZXInLCB0aGVhZFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnRoZWFkUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4udGhlYWRQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkVHJQcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgICBzdHlsZT17dGhlYWRUclByb3BzLnN0eWxlfVxuICAgICAgICAgICAgey4uLnRoZWFkVHJQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAobWFrZUhlYWRlcil9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGVyID0gKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgY29uc3Qgc29ydCA9IHNvcnRpbmcuZmluZChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgY29uc3QgdGhlYWRUaFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICBjb25zdCBjb2x1bW5IZWFkZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuXG4gICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICBjb2x1bW4uaGVhZGVyQ2xhc3NOYW1lLFxuICAgICAgICB0aGVhZFRoUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW5IZWFkZXJQcm9wcy5jbGFzc05hbWVcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXG4gICAgICAgIC4uLnRoZWFkVGhQcm9wcy5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdCA9IHtcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnJlc3QsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnJlc3RcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICBpZiAoY29sdW1uLnBpdm90Q29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IHBpdm90U29ydCA9IHNvcnRpbmcuZmluZChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICdydC1waXZvdC1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiAnLWN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIHBpdm90U29ydCA/IChwaXZvdFNvcnQuZGVzYyA/ICctc29ydC1hc2MnIDogJy1zb3J0LWRlc2MnKSA6ICcnXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0b2dnbGVTb3J0PXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiB0aGlzLnNvcnRDb2x1bW4oY29sdW1uLnBpdm90Q29sdW1ucywgZS5zaGlmdEtleSlcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb2x1bW4ucGl2b3RDb2x1bW5zLm1hcCgocGl2b3RDb2x1bW4sIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtwaXZvdENvbHVtbi5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChwaXZvdENvbHVtbi5oZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICB7aSA8IGNvbHVtbi5waXZvdENvbHVtbnMubGVuZ3RoIC0gMSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICdydC1leHBhbmRlci1oZWFkZXInLFxuICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICBmbGV4OiBgMCAwIGF1dG9gLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7ZXhwYW5kZXJDb2x1bW5XaWR0aH1weGBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgc29ydCA/IChzb3J0LmRlc2MgPyAnLXNvcnQtYXNjJyA6ICctc29ydC1kZXNjJykgOiAnJyxcbiAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiAnLWN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICAgICFzaG93ICYmICctaGlkZGVuJyxcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXG4gICAgICAgICAgfX1cbiAgICAgICAgICB0b2dnbGVTb3J0PXsoZSkgPT4ge1xuICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmIHRoaXMuc29ydENvbHVtbihjb2x1bW4sIGUuc2hpZnRLZXkpXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uaGVhZGVyLCB7XG4gICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9UaENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlUGFnZVJvdyA9IChyb3csIGksIHBhdGggPSBbXSkgPT4ge1xuICAgICAgY29uc3Qgcm93SW5mbyA9IHtcbiAgICAgICAgcm93OiByb3cuX19vcmlnaW5hbCxcbiAgICAgICAgcm93VmFsdWVzOiByb3csXG4gICAgICAgIGluZGV4OiByb3cuX19pbmRleCxcbiAgICAgICAgdmlld0luZGV4OiArK3Jvd0luZGV4LFxuICAgICAgICBsZXZlbDogcGF0aC5sZW5ndGgsXG4gICAgICAgIG5lc3RpbmdQYXRoOiBwYXRoLmNvbmNhdChbaV0pLFxuICAgICAgICBhZ2dyZWdhdGVkOiAhIXJvd1tzdWJSb3dzS2V5XSxcbiAgICAgICAgc3ViUm93czogcm93W3N1YlJvd3NLZXldXG4gICAgICB9XG4gICAgICBjb25zdCBpc0V4cGFuZGVkID0gXy5nZXQoZXhwYW5kZWRSb3dzLCByb3dJbmZvLm5lc3RpbmdQYXRoKVxuICAgICAgY29uc3QgdHJHcm91cFByb3BzID0gZ2V0VHJHcm91cFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIHVuZGVmaW5lZCwgdGhpcylcbiAgICAgIGNvbnN0IHRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VHJQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRyR3JvdXBDb21wb25lbnRcbiAgICAgICAgICBrZXk9e3Jvd0luZm8ubmVzdGluZ1BhdGguam9pbignXycpfVxuICAgICAgICAgIHsuLi50ckdyb3VwUHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgdHJQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgIHJvdy5fdmlld0luZGV4ICUgMiA/ICctZXZlbicgOiAnLW9kZCdcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50clByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXG4gICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICAgICAgICAgIGNvbnN0IHRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGRQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCBjb2x1bW4sIHRoaXMpKVxuICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0UHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgY29sdW1uLCB0aGlzKSlcblxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICAgICAgICAgIHRkUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMuY2xhc3NOYW1lXG4gICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udGRQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGVcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvblRkQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKG9uRXhwYW5kUm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbkV4cGFuZFJvdyhyb3dJbmZvLm5lc3RpbmdQYXRoLCBlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgbGV0IG5ld0V4cGFuZGVkUm93cyA9IF8uY2xvbmUoZXhwYW5kZWRSb3dzKVxuICAgICAgICAgICAgICAgICAgaWYgKGlzRXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRSb3dzOiBfLnNldChuZXdFeHBhbmRlZFJvd3MsIHJvd0luZm8ubmVzdGluZ1BhdGgsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkUm93czogXy5zZXQobmV3RXhwYW5kZWRSb3dzLCByb3dJbmZvLm5lc3RpbmdQYXRoLCB7fSlcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5waXZvdENvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcGl2b3QgZXhwYW5kZXIgY2VsbFxuICAgICAgICAgICAgICAgICAgY29uc3QgUGl2b3RDZWxsID0gY29sdW1uLnBpdm90UmVuZGVyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICdydC1waXZvdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHJvd0luZm8ubmVzdGluZ1BhdGgubGVuZ3RoID09PSAxID8gdW5kZWZpbmVkIDogYCR7MzAgKiAocm93SW5mby5uZXN0aW5nUGF0aC5sZW5ndGggLSAxKX1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uVGRDbGlja31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtyb3dJbmZvLnN1YlJvd3MgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFeHBhbmRlZD17aXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbHVtbiAmJiBjb2x1bW4ucGl2b3RSZW5kZXIgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpdm90Q2VsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnJvd0luZm99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cm93SW5mby5yb3dWYWx1ZXNbcGl2b3RWYWxLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiA8c3Bhbj57cm93W3Bpdm90VmFsS2V5XX0gKHtyb3dJbmZvLnN1YlJvd3MubGVuZ3RofSk8L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBTdWJDb21wb25lbnQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFeHBhbmRlZD17aXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHJlZ3VsYXIgZXhwYW5kZXIgY2VsbFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICAge2hpZGRlbjogIXNob3d9XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uVGRDbGlja31cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0V4cGFuZGVkPXtpc0V4cGFuZGVkfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHJlZ3VsYXIgY2VsbFxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgIXNob3cgJiYgJ2hpZGRlbidcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgey4uLnRkUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLnJlbmRlciwge1xuICAgICAgICAgICAgICAgICAgICAuLi5yb3dJbmZvLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93SW5mby5yb3dWYWx1ZXNbY29sdW1uLmlkXVxuICAgICAgICAgICAgICAgICAgfSwgcm93SW5mby5yb3dWYWx1ZXNbY29sdW1uLmlkXSl9XG4gICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgICB7KFxuICAgICAgICAgICAgcm93SW5mby5zdWJSb3dzICYmXG4gICAgICAgICAgICBpc0V4cGFuZGVkICYmXG4gICAgICAgICAgICByb3dJbmZvLnN1YlJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpLCByb3dJbmZvLm5lc3RpbmdQYXRoKSlcbiAgICAgICAgICApfVxuICAgICAgICAgIHtTdWJDb21wb25lbnQgJiYgIXJvd0luZm8uc3ViUm93cyAmJiBpc0V4cGFuZGVkICYmIFN1YkNvbXBvbmVudChyb3dJbmZvKX1cbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VQYWRSb3cgPSAocm93LCBpKSA9PiB7XG4gICAgICBjb25zdCB0ckdyb3VwUHJvcHMgPSBnZXRUckdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICBjb25zdCB0clByb3BzID0gXy5zcGxpdFByb3BzKGdldFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUckdyb3VwQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHsuLi50ckdyb3VwUHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgJy1wYWRSb3cnLFxuICAgICAgICAgICAgICB0clByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZSB8fCB7fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7U3ViQ29tcG9uZW50ICYmIChcbiAgICAgICAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICAgJ3J0LWV4cGFuZGVyLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICB0ZFByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnRkUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICBmbGV4OiBgMCAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICBjb25zdCB0ZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuXG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICAgICAgICAgICAgdGRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5Qcm9wcy5jbGFzc05hbWVcbiAgICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICAuLi50ZFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW5Qcm9wcy5zdHlsZVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIGtleT17aTJ9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICFzaG93ICYmICdoaWRkZW4nXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VDb2x1bW5Gb290ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdEZvb3RQcm9wcyA9IGdldFRmb290UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICBjb25zdCB0Rm9vdFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGZvb3RUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUZm9vdENvbXBvbmVudFxuICAgICAgICAgIGNsYXNzTmFtZT17dEZvb3RQcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnRGb290UHJvcHMuc3R5bGUsXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4udEZvb3RQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgIHRGb290VHJQcm9wcy5jbGFzc05hbWVcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17dEZvb3RUclByb3BzLnN0eWxlfVxuICAgICAgICAgICAgey4uLnRGb290VHJQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICBjb25zdCB0Rm9vdFRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGZvb3RUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uRm9vdGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEZvb3RlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcblxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICAgICAgICAgIHRGb290VGRQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5Qcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uRm9vdGVyUHJvcHMuY2xhc3NOYW1lXG4gICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udEZvb3RUZFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW5Qcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW5Gb290ZXJQcm9wcy5zdHlsZVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICdydC1waXZvdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgey4uLmNvbHVtblByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgICAgICAgey4uLnRGb290VGRQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Gb290ZXJQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5mb290ZXIpfVxuICAgICAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcmVndWxhciBleHBhbmRlciBjZWxsXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgICB7aGlkZGVuOiAhc2hvd31cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgZmxleDogYDAgMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZXhwYW5kZXJDb2x1bW5XaWR0aH1weGBcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHJlZ3VsYXIgY2VsbFxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgIXNob3cgJiYgJ2hpZGRlbidcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgey4uLmNvbHVtblByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgICB7Li4udEZvb3RUZFByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgICB7Li4uY29sdW1uRm9vdGVyUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmZvb3Rlciwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtblxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9UZm9vdENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCByb290UHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgIGNvbnN0IHRhYmxlUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGFibGVQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgY29uc3QgdEJvZHlQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUYm9keVByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICBjb25zdCBwYWdpbmF0aW9uUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0UGFnaW5hdGlvblByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICBjb25zdCBsb2FkaW5nUHJvcHMgPSBnZXRMb2FkaW5nUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgY29uc3Qgbm9EYXRhUHJvcHMgPSBnZXROb0RhdGFQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcblxuICAgIGNvbnN0IG1ha2VUYWJsZSA9ICgpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICdSZWFjdFRhYmxlJyxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgcm9vdFByb3BzLmNsYXNzTmFtZVxuICAgICAgICApfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgIC4uLnJvb3RQcm9wcy5zdHlsZVxuICAgICAgICB9fVxuICAgICAgICB7Li4ucm9vdFByb3BzLnJlc3R9XG4gICAgICA+XG4gICAgICAgIDxUYWJsZUNvbXBvbmVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0YWJsZVByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgc3R5bGU9e3RhYmxlUHJvcHMuc3R5bGV9XG4gICAgICAgICAgey4uLnRhYmxlUHJvcHMucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtoYXNIZWFkZXJHcm91cHMgPyBtYWtlSGVhZGVyR3JvdXBzKCkgOiBudWxsfVxuICAgICAgICAgIHttYWtlSGVhZGVycygpfVxuICAgICAgICAgIDxUYm9keUNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRCb2R5UHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnRCb2R5UHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB7Li4udEJvZHlQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwYWdlUm93cy5tYXAoKGQsIGkpID0+IG1ha2VQYWdlUm93KGQsIGkpKX1cbiAgICAgICAgICAgIHtwYWRSb3dzLm1hcChtYWtlUGFkUm93KX1cbiAgICAgICAgICA8L1Rib2R5Q29tcG9uZW50PlxuICAgICAgICAgIHtoYXNDb2x1bW5Gb290ZXIgPyBtYWtlQ29sdW1uRm9vdGVycygpIDogbnVsbH1cbiAgICAgICAgPC9UYWJsZUNvbXBvbmVudD5cbiAgICAgICAge3Nob3dQYWdpbmF0aW9uID8gKFxuICAgICAgICAgIDxQYWdpbmF0aW9uQ29tcG9uZW50XG4gICAgICAgICAgICB7Li4ucmVzb2x2ZWRTdGF0ZX1cbiAgICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICAgIGNhblByZXZpb3VzPXtjYW5QcmV2aW91c31cbiAgICAgICAgICAgIGNhbk5leHQ9e2Nhbk5leHR9XG4gICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMub25QYWdlQ2hhbmdlfVxuICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5vblBhZ2VTaXplQ2hhbmdlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtwYWdpbmF0aW9uUHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgc3R5bGU9e3BhZ2luYXRpb25Qcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi5wYWdpbmF0aW9uUHJvcHMucmVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFwYWdlUm93cy5sZW5ndGggJiYgKFxuICAgICAgICAgIDxOb0RhdGFDb21wb25lbnRcbiAgICAgICAgICAgIHsuLi5ub0RhdGFQcm9wc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQobm9EYXRhVGV4dCl9XG4gICAgICAgICAgPC9Ob0RhdGFDb21wb25lbnQ+XG4gICAgICAgICl9XG4gICAgICAgIDxMb2FkaW5nQ29tcG9uZW50XG4gICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICBsb2FkaW5nVGV4dD17bG9hZGluZ1RleHR9XG4gICAgICAgICAgey4uLmxvYWRpbmdQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcblxuICAgIC8vIGNoaWxkUHJvcHMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIHRvIGEgZnVuY3Rpb24tYXMtYS1jaGlsZFxuICAgIHJldHVybiBjaGlsZHJlbiA/IGNoaWxkcmVuKGZpbmFsU3RhdGUsIG1ha2VUYWJsZSwgdGhpcykgOiBtYWtlVGFibGUoKVxuICB9XG59KVxuIl19