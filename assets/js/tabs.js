const tabList = document.querySelector('[role="tablist"]')
const tabs = tabList.querySelectorAll('[role="tab"]')

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
})

let tabFocus = 0

function changeTabFocus(event) {
    const keydownLeft = 37
    const keydownRight = 39

    // Change the tabindex of the current tab to -1
    if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1)

        // Move to the next tab
        if (event.keyCode === keydownRight) {
            tabFocus++
            console.log(tabFocus)
            if (tabFocus >= tabs.length) {
                tabFocus = 0
            }
        } else {
            tabFocus--
            console.log(tabFocus)
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1
            }
        }

        // Change the focused tab
        tabs[tabFocus].setAttribute("tabindex", 0)
        tabs[tabFocus].focus()
    }
}

function changeTabPanel(event) {
    const targetTab = event.target
    const targetPanel = targetTab.getAttribute("aria-controls")
    const targetImage = targetTab.getAttribute("data-image")
    const tabContainer = targetTab.parentNode
    const mainContainer = tabContainer.parentNode

    // console.log(targetTab)
    // console.log(targetPanel)
    // console.log(mainContainer)

    // Show the correct active tab
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false)
    targetTab.setAttribute("aria-selected", true)

    // Show only the selected panel
    hideContent(mainContainer, '[role="tabpanel"]')
    showContent(mainContainer, [`#${targetPanel}`])

    // Show only the image of the selected panel
    hideContent(mainContainer, 'picture')
    showContent(mainContainer, [`#${targetImage}`])
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true))
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden')
}