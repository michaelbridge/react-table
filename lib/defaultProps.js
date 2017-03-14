'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
  data: [],
  loading: false,
  showPagination: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  expanderColumnWidth: 35,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  defaultSorting: [],

  // Controlled State Overrides
  // page: undefined,
  // pageSize: undefined,
  // sorting: undefined,

  // Controlled State Callbacks
  onExpandSubComponent: undefined,
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortingChange: undefined,

  // Pivoting
  pivotBy: undefined,
  pivotColumnWidth: 200,
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',

  // Pivoting State Overrides
  // expandedRows: {},

  // Pivoting State Callbacks
  onExpandRow: undefined,

  // General Callbacks
  onChange: function onChange() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,

  // Global Column Defaults
  column: {
    sortable: true,
    show: true,
    minWidth: 100,
    // Cells only
    render: undefined,
    className: '',
    style: {},
    getProps: emptyObj,
    // Headers only
    header: undefined,
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footer: undefined,
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: _utils2.default.makeTemplateComponent('rt-table'),
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody'),
  TrGroupComponent: _utils2.default.makeTemplateComponent('rt-tr-group'),
  TrComponent: _utils2.default.makeTemplateComponent('rt-tr'),
  ThComponent: function ThComponent(_ref) {
    var toggleSort = _ref.toggleSort;
    var className = _ref.className;
    var children = _ref.children;

    var rest = _objectWithoutProperties(_ref, ['toggleSort', 'className', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(className, 'rt-th'),
        onClick: function onClick(e) {
          toggleSort && toggleSort(e);
        }
      }, rest),
      children
    );
  },
  TdComponent: _utils2.default.makeTemplateComponent('rt-td'),
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot'),
  ExpanderComponent: function ExpanderComponent(_ref2) {
    var isExpanded = _ref2.isExpanded;

    var rest = _objectWithoutProperties(_ref2, ['isExpanded']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-expander', isExpanded && '-open')
      }, rest),
      '\u2022'
    );
  },
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref3) {
    var className = _ref3.className;
    var loading = _ref3.loading;
    var loadingText = _ref3.loadingText;

    var rest = _objectWithoutProperties(_ref3, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className)
      }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwibG9hZGluZyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsInNob3dQYWdlSnVtcCIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJkZWZhdWx0U29ydGluZyIsIm9uRXhwYW5kU3ViQ29tcG9uZW50IiwidW5kZWZpbmVkIiwib25QYWdlQ2hhbmdlIiwib25QYWdlU2l6ZUNoYW5nZSIsIm9uU29ydGluZ0NoYW5nZSIsInBpdm90QnkiLCJwaXZvdENvbHVtbldpZHRoIiwicGl2b3RWYWxLZXkiLCJwaXZvdElES2V5Iiwic3ViUm93c0tleSIsIm9uRXhwYW5kUm93Iiwib25DaGFuZ2UiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwiY29sdW1uIiwic29ydGFibGUiLCJzaG93IiwibWluV2lkdGgiLCJyZW5kZXIiLCJoZWFkZXIiLCJoZWFkZXJDbGFzc05hbWUiLCJoZWFkZXJTdHlsZSIsImdldEhlYWRlclByb3BzIiwiZm9vdGVyIiwiZm9vdGVyQ2xhc3NOYW1lIiwiZm9vdGVyU3R5bGUiLCJnZXRGb290ZXJQcm9wcyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsIlRhYmxlQ29tcG9uZW50IiwibWFrZVRlbXBsYXRlQ29tcG9uZW50IiwiVGhlYWRDb21wb25lbnQiLCJUYm9keUNvbXBvbmVudCIsIlRyR3JvdXBDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwidG9nZ2xlU29ydCIsImNoaWxkcmVuIiwicmVzdCIsImUiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJpc0V4cGFuZGVkIiwiUGFnaW5hdGlvbkNvbXBvbmVudCIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsIkxvYWRpbmdDb21wb25lbnQiLCJOb0RhdGFDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7QUFGQTs7O0FBSUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTyxFQUFQO0FBQUEsQ0FBakI7O2tCQUVlO0FBQ2I7QUFDQUMsUUFBTSxFQUZPO0FBR2JDLFdBQVMsS0FISTtBQUliQyxrQkFBZ0IsSUFKSDtBQUtiQyx1QkFBcUIsSUFMUjtBQU1iQyxtQkFBaUIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBTko7QUFPYkMsbUJBQWlCLEVBUEo7QUFRYkMsZ0JBQWMsSUFSRDtBQVNiQyx1QkFBcUIsRUFUUjtBQVViQywyQkFBeUIsSUFWWjtBQVdiQyx3QkFBc0IsSUFYVDtBQVliQyx3QkFBc0IsSUFaVDtBQWFiQyxzQkFBb0IsS0FiUDtBQWNiQyxrQkFB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QUF1SGJZLHFCQUFtQixrQ0FBMkI7QUFBQSxRQUF6QkMsVUFBeUIsU0FBekJBLFVBQXlCOztBQUFBLFFBQVZMLElBQVU7O0FBQzVDLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVcsMEJBQVcsYUFBWCxFQUEwQkssY0FBYyxPQUF4QztBQURiLFNBRU1MLElBRk47QUFBQTtBQUFBLEtBREY7QUFNRCxHQTlIWTtBQStIYk0sMkNBL0hhO0FBZ0liQyxxQkFBbUJuRSxTQWhJTjtBQWlJYm9FLGlCQUFlcEUsU0FqSUY7QUFrSWJxRSxvQkFBa0I7QUFBQSxRQUFFMUQsU0FBRixTQUFFQSxTQUFGO0FBQUEsUUFBYXhCLE9BQWIsU0FBYUEsT0FBYjtBQUFBLFFBQXNCMkQsV0FBdEIsU0FBc0JBLFdBQXRCOztBQUFBLFFBQXNDYyxJQUF0Qzs7QUFBQSxXQUNoQjtBQUFBO0FBQUEsaUJBQUssV0FBVywwQkFDZCxVQURjLEVBRWQsRUFBQyxXQUFXekUsT0FBWixFQUZjLEVBR2R3QixTQUhjO0FBQWhCLFNBS01pRCxJQUxOO0FBT0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUNHZDtBQURIO0FBUEYsS0FEZ0I7QUFBQSxHQWxJTDtBQStJYndCLG1CQUFpQixnQkFBRWxCLHFCQUFGLENBQXdCLFdBQXhCO0FBL0lKLEMiLCJmaWxlIjoiZGVmYXVsdFByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuXG5jb25zdCBlbXB0eU9iaiA9ICgpID0+ICh7fSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBHZW5lcmFsXG4gIGRhdGE6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzUsIDEwLCAyMCwgMjUsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDIwLFxuICBzaG93UGFnZUp1bXA6IHRydWUsXG4gIGV4cGFuZGVyQ29sdW1uV2lkdGg6IDM1LFxuICBjb2xsYXBzZU9uU29ydGluZ0NoYW5nZTogdHJ1ZSxcbiAgY29sbGFwc2VPblBhZ2VDaGFuZ2U6IHRydWUsXG4gIGNvbGxhcHNlT25EYXRhQ2hhbmdlOiB0cnVlLFxuICBmcmVlemVXaGVuRXhwYW5kZWQ6IGZhbHNlLFxuICBkZWZhdWx0U29ydGluZzogW10sXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBPdmVycmlkZXNcbiAgLy8gcGFnZTogdW5kZWZpbmVkLFxuICAvLyBwYWdlU2l6ZTogdW5kZWZpbmVkLFxuICAvLyBzb3J0aW5nOiB1bmRlZmluZWQsXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBDYWxsYmFja3NcbiAgb25FeHBhbmRTdWJDb21wb25lbnQ6IHVuZGVmaW5lZCxcbiAgb25QYWdlQ2hhbmdlOiB1bmRlZmluZWQsXG4gIG9uUGFnZVNpemVDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25Tb3J0aW5nQ2hhbmdlOiB1bmRlZmluZWQsXG5cbiAgLy8gUGl2b3RpbmdcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxuICBwaXZvdENvbHVtbldpZHRoOiAyMDAsXG4gIHBpdm90VmFsS2V5OiAnX3Bpdm90VmFsJyxcbiAgcGl2b3RJREtleTogJ19waXZvdElEJyxcbiAgc3ViUm93c0tleTogJ19zdWJSb3dzJyxcblxuICAvLyBQaXZvdGluZyBTdGF0ZSBPdmVycmlkZXNcbiAgLy8gZXhwYW5kZWRSb3dzOiB7fSxcblxuICAvLyBQaXZvdGluZyBTdGF0ZSBDYWxsYmFja3NcbiAgb25FeHBhbmRSb3c6IHVuZGVmaW5lZCxcblxuICAvLyBHZW5lcmFsIENhbGxiYWNrc1xuICBvbkNoYW5nZTogKCkgPT4gbnVsbCxcblxuICAvLyBDbGFzc2VzXG4gIGNsYXNzTmFtZTogJycsXG4gIHN0eWxlOiB7fSxcblxuICAvLyBDb21wb25lbnQgZGVjb3JhdG9yc1xuICBnZXRQcm9wczogZW1wdHlPYmosXG4gIGdldFRhYmxlUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEdyb3VwUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEdyb3VwVHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkR3JvdXBUaFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkVHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkVGhQcm9wczogZW1wdHlPYmosXG4gIGdldFRib2R5UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUckdyb3VwUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGRQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRkUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRMb2FkaW5nUHJvcHM6IGVtcHR5T2JqLFxuICBnZXROb0RhdGFQcm9wczogZW1wdHlPYmosXG5cbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xuICBjb2x1bW46IHtcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBzaG93OiB0cnVlLFxuICAgIG1pbldpZHRoOiAxMDAsXG4gICAgLy8gQ2VsbHMgb25seVxuICAgIHJlbmRlcjogdW5kZWZpbmVkLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IHt9LFxuICAgIGdldFByb3BzOiBlbXB0eU9iaixcbiAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICBoZWFkZXI6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxuICAgIGhlYWRlclN0eWxlOiB7fSxcbiAgICBnZXRIZWFkZXJQcm9wczogZW1wdHlPYmosXG4gICAgLy8gRm9vdGVycyBvbmx5XG4gICAgZm9vdGVyOiB1bmRlZmluZWQsXG4gICAgZm9vdGVyQ2xhc3NOYW1lOiAnJyxcbiAgICBmb290ZXJTdHlsZToge30sXG4gICAgZ2V0Rm9vdGVyUHJvcHM6IGVtcHR5T2JqXG4gIH0sXG5cbiAgLy8gVGV4dFxuICBwcmV2aW91c1RleHQ6ICdQcmV2aW91cycsXG4gIG5leHRUZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmdUZXh0OiAnTG9hZGluZy4uLicsXG4gIG5vRGF0YVRleHQ6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZVRleHQ6ICdQYWdlJyxcbiAgb2ZUZXh0OiAnb2YnLFxuICByb3dzVGV4dDogJ3Jvd3MnLFxuXG4gIC8vIENvbXBvbmVudHNcbiAgVGFibGVDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10YWJsZScpLFxuICBUaGVhZENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRoZWFkJyksXG4gIFRib2R5Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGJvZHknKSxcbiAgVHJHcm91cENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRyLWdyb3VwJyksXG4gIFRyQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdHInKSxcbiAgVGhDb21wb25lbnQ6ICh7dG9nZ2xlU29ydCwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucmVzdH0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3NOYW1lLCAncnQtdGgnKX1cbiAgICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgdG9nZ2xlU29ydCAmJiB0b2dnbGVTb3J0KGUpXG4gICAgICAgIH19XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH0sXG4gIFRkQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGQnKSxcbiAgVGZvb3RDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Zm9vdCcpLFxuICBFeHBhbmRlckNvbXBvbmVudDogKHtpc0V4cGFuZGVkLCAuLi5yZXN0fSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtZXhwYW5kZXInLCBpc0V4cGFuZGVkICYmICctb3BlbicpfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgID4mYnVsbDs8L2Rpdj5cbiAgICApXG4gIH0sXG4gIFBhZ2luYXRpb25Db21wb25lbnQ6IFBhZ2luYXRpb24sXG4gIFByZXZpb3VzQ29tcG9uZW50OiB1bmRlZmluZWQsXG4gIE5leHRDb21wb25lbnQ6IHVuZGVmaW5lZCxcbiAgTG9hZGluZ0NvbXBvbmVudDogKHtjbGFzc05hbWUsIGxvYWRpbmcsIGxvYWRpbmdUZXh0LCAuLi5yZXN0fSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgJy1sb2FkaW5nJyxcbiAgICAgIHsnLWFjdGl2ZSc6IGxvYWRpbmd9LFxuICAgICAgY2xhc3NOYW1lXG4gICAgKX1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSctbG9hZGluZy1pbm5lcic+XG4gICAgICAgIHtsb2FkaW5nVGV4dH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApLFxuICBOb0RhdGFDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1ub0RhdGEnKVxufVxuIl19