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

//
// import _ from './utils'

var defaultButton = function defaultButton(props) {
  return _react2.default.createElement(
    'button',
    _extends({}, props, { className: '-btn' }),
    props.children
  );
};

exports.default = _react2.default.createClass({
  displayName: 'pagination',
  getInitialState: function getInitialState() {
    return {
      page: this.props.page
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });
  },
  getSafePage: function getSafePage(page) {
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  },
  changePage: function changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page: page });
    this.props.onPageChange(page);
  },
  applyPage: function applyPage(e) {
    e && e.preventDefault();
    var page = this.state.page;
    this.changePage(page === '' ? this.props.page : page);
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var pages = _props.pages;
    var page = _props.page;
    var showPageSizeOptions = _props.showPageSizeOptions;
    var pageSizeOptions = _props.pageSizeOptions;
    var pageSize = _props.pageSize;
    var showPageJump = _props.showPageJump;
    var canPrevious = _props.canPrevious;
    var canNext = _props.canNext;
    var onPageSizeChange = _props.onPageSizeChange;
    var className = _props.className;
    var _props$PreviousCompon = _props.PreviousComponent;
    var PreviousComponent = _props$PreviousCompon === undefined ? defaultButton : _props$PreviousCompon;
    var _props$NextComponent = _props.NextComponent;
    var NextComponent = _props$NextComponent === undefined ? defaultButton : _props$NextComponent;


    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(className, '-pagination'),
        style: this.props.paginationStyle
      },
      _react2.default.createElement(
        'div',
        { className: '-previous' },
        _react2.default.createElement(
          PreviousComponent,
          {
            onClick: function onClick(e) {
              if (!canPrevious) return;
              _this.changePage(page - 1);
            },
            disabled: !canPrevious
          },
          this.props.previousText
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-center' },
        _react2.default.createElement(
          'span',
          { className: '-pageInfo' },
          this.props.pageText,
          ' ',
          showPageJump ? _react2.default.createElement(
            'form',
            { className: '-pageJump',
              onSubmit: this.applyPage
            },
            _react2.default.createElement('input', {
              type: this.state.page === '' ? 'text' : 'number',
              onChange: function onChange(e) {
                var val = e.target.value;
                var page = val - 1;
                if (val === '') {
                  return _this.setState({ page: val });
                }
                _this.setState({ page: _this.getSafePage(page) });
              },
              value: this.state.page === '' ? '' : this.state.page + 1,
              onBlur: this.applyPage
            })
          ) : _react2.default.createElement(
            'span',
            { className: '-currentPage' },
            page + 1
          ),
          ' ',
          this.props.ofText,
          ' ',
          _react2.default.createElement(
            'span',
            { className: '-totalPages' },
            pages
          )
        ),
        showPageSizeOptions && _react2.default.createElement(
          'span',
          { className: 'select-wrap -pageSizeOptions' },
          _react2.default.createElement(
            'select',
            {
              onChange: function onChange(e) {
                return onPageSizeChange(Number(e.target.value));
              },
              value: pageSize
            },
            pageSizeOptions.map(function (option, i) {
              return _react2.default.createElement(
                'option',
                {
                  key: i,
                  value: option },
                option,
                ' ',
                _this.props.rowsText
              );
            })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-next' },
        _react2.default.createElement(
          NextComponent,
          {
            onClick: function onClick(e) {
              if (!canNext) return;
              _this.changePage(page + 1);
            },
            disabled: !canNext
          },
          this.props.nextText
        )
      )
    );
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiY3JlYXRlQ2xhc3MiLCJnZXRJbml0aWFsU3RhdGUiLCJwYWdlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwiZ2V0U2FmZVBhZ2UiLCJNYXRoIiwibWluIiwibWF4IiwicGFnZXMiLCJjaGFuZ2VQYWdlIiwib25QYWdlQ2hhbmdlIiwiYXBwbHlQYWdlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RhdGUiLCJyZW5kZXIiLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwicGFnZVNpemUiLCJzaG93UGFnZUp1bXAiLCJjYW5QcmV2aW91cyIsImNhbk5leHQiLCJvblBhZ2VTaXplQ2hhbmdlIiwiY2xhc3NOYW1lIiwiUHJldmlvdXNDb21wb25lbnQiLCJOZXh0Q29tcG9uZW50IiwicGFnaW5hdGlvblN0eWxlIiwicHJldmlvdXNUZXh0IiwicGFnZVRleHQiLCJ2YWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm9mVGV4dCIsIk51bWJlciIsIm1hcCIsIm9wdGlvbiIsImkiLCJyb3dzVGV4dCIsIm5leHRUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxLQUFEO0FBQUEsU0FDcEI7QUFBQTtBQUFBLGlCQUFZQSxLQUFaLElBQW1CLFdBQVUsTUFBN0I7QUFBcUNBLFVBQU1DO0FBQTNDLEdBRG9CO0FBQUEsQ0FBdEI7O2tCQUllLGdCQUFNQyxXQUFOLENBQWtCO0FBQUE7QUFDL0JDLGlCQUQrQiw2QkFDWjtBQUNqQixXQUFPO0FBQ0xDLFlBQU0sS0FBS0osS0FBTCxDQUFXSTtBQURaLEtBQVA7QUFHRCxHQUw4QjtBQU0vQkMsMkJBTitCLHFDQU1KQyxTQU5JLEVB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InBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbi8vIGltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IGRlZmF1bHRCdXR0b24gPSAocHJvcHMpID0+IChcbiAgPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT0nLWJ0bic+e3Byb3BzLmNoaWxkcmVufTwvYnV0dG9uPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IHRoaXMucHJvcHMucGFnZVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogbmV4dFByb3BzLnBhZ2V9KVxuICB9LFxuICBnZXRTYWZlUGFnZSAocGFnZSkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwYWdlLCAwKSwgdGhpcy5wcm9wcy5wYWdlcyAtIDEpXG4gIH0sXG4gIGNoYW5nZVBhZ2UgKHBhZ2UpIHtcbiAgICBwYWdlID0gdGhpcy5nZXRTYWZlUGFnZShwYWdlKVxuICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2V9KVxuICAgIHRoaXMucHJvcHMub25QYWdlQ2hhbmdlKHBhZ2UpXG4gIH0sXG4gIGFwcGx5UGFnZSAoZSkge1xuICAgIGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgcGFnZSA9IHRoaXMuc3RhdGUucGFnZVxuICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlID09PSAnJyA/IHRoaXMucHJvcHMucGFnZSA6IHBhZ2UpXG4gIH0sXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgLy8gQ29tcHV0ZWRcbiAgICAgIHBhZ2VzLFxuICAgICAgLy8gUHJvcHNcbiAgICAgIHBhZ2UsXG4gICAgICBzaG93UGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzaG93UGFnZUp1bXAsXG4gICAgICBjYW5QcmV2aW91cyxcbiAgICAgIGNhbk5leHQsXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgUHJldmlvdXNDb21wb25lbnQgPSBkZWZhdWx0QnV0dG9uLFxuICAgICAgTmV4dENvbXBvbmVudCA9IGRlZmF1bHRCdXR0b25cbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzTmFtZSwgJy1wYWdpbmF0aW9uJyl9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnBhZ2luYXRpb25TdHlsZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9Jy1wcmV2aW91cyc+XG4gICAgICAgICAgPFByZXZpb3VzQ29tcG9uZW50XG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWNhblByZXZpb3VzKSByZXR1cm5cbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuUHJldmlvdXN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMucHJldmlvdXNUZXh0fVxuICAgICAgICAgIDwvUHJldmlvdXNDb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nLWNlbnRlcic+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSctcGFnZUluZm8nPlxuICAgICAgICAgICAge3RoaXMucHJvcHMucGFnZVRleHR9IHtzaG93UGFnZUp1bXAgPyAoXG4gICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nLXBhZ2VKdW1wJ1xuICAgICAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmFwcGx5UGFnZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5zdGF0ZS5wYWdlID09PSAnJyA/ICd0ZXh0JyA6ICdudW1iZXInfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdmFsIC0gMVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtwYWdlOiB2YWx9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2U6IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSl9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJycgOiB0aGlzLnN0YXRlLnBhZ2UgKyAxfVxuICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmFwcGx5UGFnZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9Jy1jdXJyZW50UGFnZSc+e3BhZ2UgKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICl9IHt0aGlzLnByb3BzLm9mVGV4dH0gPHNwYW4gY2xhc3NOYW1lPSctdG90YWxQYWdlcyc+e3BhZ2VzfTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAge3Nob3dQYWdlU2l6ZU9wdGlvbnMgJiYgKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzZWxlY3Qtd3JhcCAtcGFnZVNpemVPcHRpb25zJz5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25QYWdlU2l6ZUNoYW5nZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17cGFnZVNpemV9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7cGFnZVNpemVPcHRpb25zLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb259PlxuICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb259IHt0aGlzLnByb3BzLnJvd3NUZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSctbmV4dCc+XG4gICAgICAgICAgPE5leHRDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghY2FuTmV4dCkgcmV0dXJuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlICsgMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhbk5leHR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dFRleHR9XG4gICAgICAgICAgPC9OZXh0Q29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcbiJdfQ==