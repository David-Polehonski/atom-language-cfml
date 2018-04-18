describe('html-cfml grammar', function() {
    var grammar;
    var TextEditor = null

    var buildTextEditor = function (params) {
      if(atom.workspace.buildTextEditor) {
        atom.workspace.buildTextEditor(params) ;
      } else {
        TextEditor = TextEditor || require('atom').TextEditor;
        new TextEditor(params);
      }
    };

    beforeEach(function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('language-html');
        });

        waitsForPromise(function() {
          return atom.packages.activatePackage('language-cfml');
        });

        runs(function() {
          grammar = atom.grammars.grammarForScopeName('text.html.cfml');
        });
    });

    afterEach(function() {
      waitsForPromise(function() {
        return atom.packages.deactivatePackage('language-html');
      });

      waitsForPromise(function() {
        return atom.packages.deactivatePackage('language-cfml');
      });
    });

    it('parses the grammar', function() {
        expect(grammar).toBeTruthy();
        expect(grammar.scopeName).toBe('text.html.cfml');
    });

    describe('populating a select list', function() {

        it('should tokenize correctly', function() {
            var tokens = grammar.tokenizeLines(
                [
                    '<cfoutput>',
                      '<select id="countries" name="countries">',
                        '<cfloop array="#variables.countries#" index="country">',
                          '<option value="country.id">#country.name#</option>',
                        '</cfloop>',
                      '</select>',
                    '</cfoutput>'
                ].join('\n')
            );

            //  Tokenizes opening cfoutput tag
            expect(tokens[0][0]).toEqual({
                value: '<',
                scopes: [
                  'text.html.cfml',
                  'meta.tag.cfoutput.cfml',
                  'punctuation.definition.tag.begin.cfml'
                ]
            });
            expect(tokens[0][1]).toEqual({
                value: 'cfoutput',
                scopes: [
                  'text.html.cfml',
                  'meta.tag.cfoutput.cfml',
                  'entity.name.tag.cfoutput.cfml'
                ]
            });
            expect(tokens[0][2]).toEqual({
              value: '>',
              scopes: [
                'text.html.cfml',
                'meta.tag.cfoutput.cfml',
                'punctuation.definition.tag.end.cfml'
              ]
            });

            //  Tokenizes opening select tag
            expect(tokens[1][0]).toEqual({
                value: '<',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[1][1]).toEqual({
                value: 'select',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'entity.name.tag.inline.select.html'
                ]
            });
            expect(tokens[1][2]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.inline.select.html']
            });
            expect(tokens[1][3]).toEqual({
                value: 'id',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.id.html',
                    'entity.other.attribute-name.id.html'
                ]
            });
            expect(tokens[1][4]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.id.html',
                    'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[1][5]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.id.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[1][6]).toEqual({
                value: 'countries',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.id.html',
                    'string.quoted.double.html',
                    'meta.toc-list.id.html'
                ]
            });
            expect(tokens[1][7]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.id.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[1][8]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.inline.select.html']
            });
            expect(tokens[1][9]).toEqual({
                value: 'name',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[1][10]).toEqual({
                value: '=',
                scopes: [
                  'text.html.cfml',
                  'meta.scope.cfoutput.cfml',
                  'meta.tag.inline.select.html',
                  'meta.attribute-with-value.html',
                  'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[1][11]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[1][12]).toEqual({
                value: 'countries',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });
            expect(tokens[1][13]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[1][14]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'punctuation.definition.tag.end.html'
                ]
            });

            expect(tokens[2][0]).toEqual({
                value: '<',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'punctuation.definition.tag.begin.cfml'
                ]
            });
            expect(tokens[2][1]).toEqual({
                value: 'cfloop',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'entity.name.tag.cfloop.cfml'
                ]
            });
            expect(tokens[2][2]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.cfloop.cfml']
            });
            expect(tokens[2][3]).toEqual({
                value: 'array',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'entity.other.attribute-name.array.cfml'
                ]
            });
            expect(tokens[2][4]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'punctuation.separator.key-value.cfml'
                ]
            });
            expect(tokens[2][5]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'punctuation.definition.string.begin.cfml'
                ]
            });
            expect(tokens[2][6]).toEqual({
                value: '#',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'constant.character.hash.cfml'
                ]
            });
            expect(tokens[2][7]).toEqual({
                value: 'variables',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'variable.language.scope.cfml'
                ]
            });
            expect(tokens[2][8]).toEqual({
                value: '.',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'keyword.operator.accessor.cfml'
                ]
            });
            expect(tokens[2][9]).toEqual({
                value: 'countries',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'variable.other.cfml'
                ]
            });
            expect(tokens[2][10]).toEqual({
                value: '#',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'constant.character.hash.cfml'
                ]
            });
            expect(tokens[2][11]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.array.cfml',
                    'string.quoted.double.cfml',
                    'punctuation.definition.string.end.cfml'
                ]
            });
            expect(tokens[2][12]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.cfloop.cfml']
            });
            expect(tokens[2][13]).toEqual({
                value: 'index',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.index.cfml',
                    'entity.other.attribute-name.index.cfml'
                ]
            });
            expect(tokens[2][14]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.index.cfml',
                    'punctuation.separator.key-value.cfml'
                ]
            });
            expect(tokens[2][15]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.index.cfml',
                    'string.quoted.double.cfml',
                    'punctuation.definition.string.begin.cfml'
                ]
            });
            expect(tokens[2][16]).toEqual({
                value: 'country',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.index.cfml',
                    'string.quoted.double.cfml'
                ]
            });
            expect(tokens[2][17]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'meta.attribute-with-value.index.cfml',
                    'string.quoted.double.cfml',
                    'punctuation.definition.string.end.cfml'
                ]
            });
            expect(tokens[2][18]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'punctuation.definition.tag.end.cfml'
                ]
            });

            expect(tokens[3][0]).toEqual({
                value: '<',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[3][1]).toEqual({
                value: 'option',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'entity.name.tag.inline.option.html'
                ]
            });
            expect(tokens[3][2]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.inline.option.html']
            });
            expect(tokens[3][3]).toEqual({
                value: 'value',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[3][4]).toEqual({
                value: '=',
                scopes: [
                  'text.html.cfml',
                  'meta.scope.cfoutput.cfml',
                  'meta.tag.inline.option.html',
                  'meta.attribute-with-value.html',
                  'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[3][5]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[3][6]).toEqual({
                value: 'country.id',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });
            expect(tokens[3][7]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[3][8]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'punctuation.definition.tag.end.html'
                ]
            });
            expect(tokens[3][9]).toEqual({
                value: '#',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'constant.character.hash.cfml'
                ]
            });
            expect(tokens[3][10]).toEqual({
                value: 'country',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'variable.other.cfml']
            });
            expect(tokens[3][11]).toEqual({
                value: '.',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'keyword.operator.accessor.cfml'
                ]
            });
            expect(tokens[3][12]).toEqual({
                value: 'name',
                scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'variable.other.cfml']
            });
            expect(tokens[3][13]).toEqual({
                value: '#',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'constant.character.hash.cfml'
                ]
            });
            expect(tokens[3][14]).toEqual({
                value: '</',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[3][15]).toEqual({
                value: 'option',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'entity.name.tag.inline.option.html'
                ]
            });
            expect(tokens[3][16]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.option.html',
                    'punctuation.definition.tag.end.html'
                ]
            });

            expect(tokens[4][0]).toEqual({
                value: '</',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'punctuation.definition.tag.begin.cfml'
                ]
            });
            expect(tokens[4][1]).toEqual({
                value: 'cfloop',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'entity.name.tag.cfloop.cfml'
                ]
            });
            expect(tokens[4][2]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.cfloop.cfml',
                    'punctuation.definition.tag.end.cfml'
                ]
            });

            expect(tokens[5][0]).toEqual({
                value: '</',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[5][1]).toEqual({
                value: 'select',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'entity.name.tag.inline.select.html'
                ]
            });
            expect(tokens[5][2]).toEqual({
                value: '>',
                scopes: [
                    'text.html.cfml',
                    'meta.scope.cfoutput.cfml',
                    'meta.tag.inline.select.html',
                    'punctuation.definition.tag.end.html'
                ]
            });

            expect(tokens[6][0]).toEqual({
                value: '</',
                scopes: [
                  'text.html.cfml',
                  'meta.tag.cfoutput.cfml',
                  'punctuation.definition.tag.begin.cfml'
                ]
            });
            expect(tokens[6][1]).toEqual({
                value: 'cfoutput',
                scopes: [
                  'text.html.cfml',
                  'meta.tag.cfoutput.cfml',
                  'entity.name.tag.cfoutput.cfml'
                ]
            });
            expect(tokens[6][2]).toEqual({
                value: '>',
                scopes: [
                  'text.html.cfml',
                  'meta.tag.cfoutput.cfml',
                  'punctuation.definition.tag.end.cfml'
                ]
            });
        });
    });

    describe('tokenizing cfcomments', function() {
        it('should tokenize single line cfcomments correctly', function() {
            var tokens = grammar.tokenizeLines('<!--- cfcomment goes here --->');

            expect(tokens[0][0]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'comment.line.cfml', 'punctuation.definition.comment.start.cfml'] });
            expect(tokens[0][1]).toEqual({ value: ' cfcomment goes here ', scopes: ['text.html.cfml', 'comment.line.cfml'] });
            expect(tokens[0][2]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'comment.line.cfml', 'punctuation.definition.comment.end.cfml'] });
        });

        it('should tokenize multi line cfcomments correctly', function() {
            var tokens = grammar.tokenizeLines(
            '<!---' + '\n' +
              'cfcomment goes here' + '\n' +
              'and goes here' + '\n' +
            '--->');

            expect(tokens[0][0]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'comment.block.cfml', 'punctuation.definition.comment.start.cfml'] });
            expect(tokens[1][0].scopes).toEqual( ['text.html.cfml', 'comment.block.cfml'] );
            expect(tokens[2][0].scopes).toEqual( ['text.html.cfml', 'comment.block.cfml'] );
            expect(tokens[3][0]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'comment.block.cfml', 'punctuation.definition.comment.end.cfml'] });
        });

        it('should tokenize multi line cfcomments containing HTML', function() {
            var tokens = grammar.tokenizeLines(
            '<!--- Removed html code: ' + '\n' +
              '<tr>' + '\n' +
                  '<td>Some Content</td>' + '\n' +
                  '<td>and some here</td>' + '\n' +
              '</tr>' + '\n' +
            '--->');

            expect(tokens[0][0]).toEqual({ value: '<!---', scopes: ['text.html.cfml', 'comment.block.cfml', 'punctuation.definition.comment.start.cfml'] });
            expect(tokens[0][1]).toEqual({ value: ' Removed html code: ', scopes: ['text.html.cfml', 'comment.block.cfml'] });
            expect(tokens[1][0]).toEqual({ value: '<tr>', scopes: ['text.html.cfml', 'comment.block.cfml'] });
            expect(tokens[2][0]).toEqual({ value: '<td>Some Content</td>', scopes: ['text.html.cfml', 'comment.block.cfml'] });
            expect(tokens[3][0]).toEqual({ value: '<td>and some here</td>', scopes: ['text.html.cfml', 'comment.block.cfml'] });
            expect(tokens[4][0]).toEqual({ value: '</tr>', scopes: ['text.html.cfml', 'comment.block.cfml'] });
            expect(tokens[5][0]).toEqual({ value: '--->', scopes: ['text.html.cfml', 'comment.block.cfml', 'punctuation.definition.comment.end.cfml'] });
        });

        it('should tokenize cfcomments embedded in html tags correctly', function() {
            var tokens = grammar.tokenizeLines(
                '<input type="text" name="credit_card_number" <!--- embedded cfcomment ---> />'
            );

            expect(tokens[0][0]).toEqual({
                value: '<',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[0][1]).toEqual({
                value: 'input',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'entity.name.tag.inline.input.html'
                ]
            });
            expect(tokens[0][2]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });
            expect(tokens[0][3]).toEqual({
                value: 'type',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[0][4]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[0][5]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[0][6]).toEqual({
                value: 'text',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });
            expect(tokens[0][7]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[0][8]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });
            expect(tokens[0][9]).toEqual({
                value: 'name',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[0][10]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[0][11]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[0][12]).toEqual({
                value: 'credit_card_number',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });
            expect(tokens[0][13]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[0][14]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });

            expect(tokens[0][15]).toEqual({
                value: '<!---',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml', 'punctuation.definition.comment.start.cfml']
            });

            expect(tokens[0][16]).toEqual({
                value: ' embedded cfcomment ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml']
            });

            expect(tokens[0][17]).toEqual({
                value: '--->',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml', 'punctuation.definition.comment.end.cfml']
            });

            expect(tokens[0][18]).toEqual({
                value: ' />',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'punctuation.definition.tag.end.html'
                ]
            });
        });

        it('should not highlight hash signs in cfcomments', function() {
            var tokens = grammar.tokenizeLines(
                '<input type="text" name="credit_card_number" <!--- #rc.name# should not be tokenized ---> />'
            );

            expect(tokens[0][0]).toEqual({
                value: '<',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'punctuation.definition.tag.begin.html'
                ]
            });
            expect(tokens[0][1]).toEqual({
                value: 'input',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'entity.name.tag.inline.input.html'
                ]
            });
            expect(tokens[0][2]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });
            expect(tokens[0][3]).toEqual({
                value: 'type',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[0][4]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[0][5]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[0][6]).toEqual({
                value: 'text',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });
            expect(tokens[0][7]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });
            expect(tokens[0][8]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });
            expect(tokens[0][9]).toEqual({
                value: 'name',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'entity.other.attribute-name.html'
                ]
            });
            expect(tokens[0][10]).toEqual({
                value: '=',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'punctuation.separator.key-value.html'
                ]
            });
            expect(tokens[0][11]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.begin.html'
                ]
            });
            expect(tokens[0][12]).toEqual({
                value: 'credit_card_number',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html'
                ]
            });

            expect(tokens[0][13]).toEqual({
                value: '"',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'meta.attribute-with-value.html',
                    'string.quoted.double.html',
                    'punctuation.definition.string.end.html'
                ]
            });

            expect(tokens[0][14]).toEqual({
                value: ' ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html']
            });

            expect(tokens[0][15]).toEqual({
                value: '<!---',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml', 'punctuation.definition.comment.start.cfml']
            });

            expect(tokens[0][16]).toEqual({
                value: ' #rc.name# should not be tokenized ',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml']
            });

            expect(tokens[0][17]).toEqual({
                value: '--->',
                scopes: ['text.html.cfml', 'meta.tag.inline.input.html', 'comment.line.cfml', 'punctuation.definition.comment.end.cfml']
            });

            expect(tokens[0][18]).toEqual({
                value: ' />',
                scopes: [
                    'text.html.cfml',
                    'meta.tag.inline.input.html',
                    'punctuation.definition.tag.end.html'
                ]
            });
        });
    });

    describe('tokenization in strings', function() {

        xit('should tokenize embedded cf in strings', function() {
            var tokens = grammar.tokenizeLines([
              '<cfoutput>',
                'This is just a test',
              '</cfoutput>'
            ].join('\n'));

            expect(tokens[0][0]).toEqual({
                value: '<',
                scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'punctuation.definition.tag.begin.cfml']
            });

            expect(tokens[0][1]).toEqual({
                value: 'cfoutput',
                scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'entity.name.tag.cfoutput.cfml']
            });

            expect(tokens[0][2]).toEqual({
              value: '>',
              scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'punctuation.definition.tag.end.cfml']
            });

        });
    });

    it('should allow cf embedded within JS', function() {
      var tokens = grammar.tokenizeLines([
        '<script type="text/javascript">',
          '<cfoutput>',
            'function doCabDrop(){',
              'var params = new Object();',
              'params.pudate = \'#dateformat(now(),"yyyy-mm-dd")#\';',
              'params.putime = \'#timeformat(now(),"HH:nn:ss")#\';',
              'params.userid = \'#session.googleid#\';',
            '}',
          '</cfoutput>',
        '</script>'
      ].join('\n'));

      console.log(tokens);

    });

    xit('should tokenize cfml in unquoted attributes', function() {
        var tokens = grammar.tokenizeLines('<cfoutput><span class=#className#></span></cfoutput>');

        expect(tokens[0][0]).toEqual({
            value: '<',
            scopes: ['text.html.cfml', 'meta.tag.cfml', 'punctuation.definition.tag.begin.cfml']
        });
        expect(tokens[0][1]).toEqual({
            value: 'cfoutput',
            scopes: ['text.html.cfml', 'meta.tag.cfml', 'entity.name.tag.cfml']
        });
        // expect(tokens[0][2]).toEqual({ value: '>', scopes: ['text.html.cfml', 'meta.tag.cfml', 'punctuation.definition.tag.end.cfml'] });
        expect(tokens[0][3]).toEqual({
            value: '<',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'punctuation.definition.tag.html'
            ]
        });
        expect(tokens[0][4]).toEqual({
            value: 'span',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'entity.name.tag.html'
            ]
        });
        expect(tokens[0][5]).toEqual({
            value: ' ',
            scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.span.html']
        });
        expect(tokens[0][6]).toEqual({
            value: 'class',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'entity.other.attribute-name.html'
            ]
        });
        expect(tokens[0][7]).toEqual({
            value: '=',
            scopes: ['text.html.cfml', 'meta.scope.cfoutput.cfml', 'meta.tag.span.html']
        });
        expect(tokens[0][8]).toEqual({
            value: '#className#',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'string.unquoted.html'
            ]
        });
        expect(tokens[0][9]).toEqual({
            value: '>',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'punctuation.definition.tag.html'
            ]
        });
        expect(tokens[0][10]).toEqual({
            value: '<',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'punctuation.definition.tag.html',
                'meta.scope.between-tag-pair.html'
            ]
        });
        expect(tokens[0][11]).toEqual({
            value: '/',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'punctuation.definition.tag.html'
            ]
        });
        expect(tokens[0][12]).toEqual({
            value: 'span',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'entity.name.tag.html'
            ]
        });
        expect(tokens[0][13]).toEqual({
            value: '>',
            scopes: [
                'text.html.cfml',
                'meta.scope.cfoutput.cfml',
                'meta.tag.span.html',
                'punctuation.definition.tag.html'
            ]
        });
        expect(tokens[0][14]).toEqual({
            value: '</',
            scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'punctuation.definition.tag.begin.cfml']
        });
        expect(tokens[0][15]).toEqual({
            value: 'cfoutput',
            scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'entity.name.tag.cfoutput.cfml']
        });
        expect(tokens[0][16]).toEqual({
            value: '>',
            scopes: ['text.html.cfml', 'meta.tag.cfoutput.cfml', 'punctuation.definition.tag.end.cfml']
        });
    });

    it('should tokenize custom tags', function() {
        var tokens = grammar.tokenizeLines('<cf_PageRow> </cf_PageRow>');

        expect(tokens[0][0]).toEqual({
            value: '<',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'punctuation.definition.tag.begin.cfml']
        });
        expect(tokens[0][1]).toEqual({
            value: 'cf_PageRow',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'entity.name.tag.cf_PageRow.cfml']
        });
        expect(tokens[0][2]).toEqual({
            value: '>',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'punctuation.definition.tag.end.cfml']
        });
        expect(tokens[0][3]).toEqual({ value: ' ', scopes: ['text.html.cfml'] });
        expect(tokens[0][4]).toEqual({
            value: '</',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'punctuation.definition.tag.begin.cfml']
        });
        expect(tokens[0][5]).toEqual({
            value: 'cf_PageRow',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'entity.name.tag.cf_PageRow.cfml']
        });
        expect(tokens[0][6]).toEqual({
            value: '>',
            scopes: ['text.html.cfml', 'meta.tag.cf_PageRow.cfml', 'punctuation.definition.tag.end.cfml']
        });
    });
});
