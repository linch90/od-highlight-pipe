## highlight pipe (angular)

Provide a highlight mechanism for `AutoComplete` or other components.

Highlight the matching text with `<b></b>`

**File**

```typescript
import { OdHighlightPipeModule } from "@linch90/od-highlight-pipe";
```

**Usage**

```html
<span [innerHTML]="value | highlight: inputText"></span>
<!-- highlight the value by inputText -->
<span [innerHTML]="value | highlight: inputText:true"></span>
<!-- highlight the value by inputText on enabling the pinyin parsing mode -->
```
