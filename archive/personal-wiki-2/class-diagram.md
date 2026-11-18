@startuml

class MainContent {
    +static displayContent(file: String): void
}

class CopyButton {

}

class MarkdownUtil {
    +static parse(file: String): HTMLElement, Array
    +transformHeaders()
}

class GithubApi {
    static url: String
    static data: JsonDocument
    static subdirectory: String
    +retrieveData(): void
}

class SideNav {
    static divElement: HTMLElement
    static APIData: Json
    +registerClickEvent(element: HTMLElement, dataEntry: JsonArray): void
    +displayItems(dataEntry: JsonArray): HTMLElement
    +iterateData(): void
    +collapseButton(): void
}

class DropdownMenu {
    +extractTitles(tokens: JsonArray): array
    +displayHeaders(): void
}

SideNav --> MainContent
SideNav --> GithubApi
' Composition
SideNav *-- DropdownMenu 

MainContent *-- CopyButton

MainContent --> MarkdownUtil
DropdownMenu --> MarkdownUtil



@enduml

<!-- Example of composition implementation: -->
<!-- DropdownMenu dropdownMenu;  // Composition -->
