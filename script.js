let anchorCount = 0;
const MAX_ANCHORS = 20;
let currentAnchorId = null;

function addAnchor() {
    if (anchorCount >= MAX_ANCHORS) {
        document.getElementById("max-anchor-message").style.display = "inline";
        return;
    }

    // Reset inputs and open modal for adding new anchor
    document.getElementById("edit-name").value = "";
    document.getElementById("edit-position").value = "";
    currentAnchorId = null; // Clear any current anchor for editing
    document.getElementById("overlay").style.display = "block"; // Show overlay
    document.getElementById("edit-box").style.display = "block"; // Show edit box
}

function openEditBox(anchorId) {
    const anchor = document.getElementById(anchorId);
    const name = anchor.querySelector("a").innerText;
    const position = anchor.querySelector(".position").innerText;

    document.getElementById("edit-name").value = name;
    document.getElementById("edit-position").value = position;

    currentAnchorId = anchorId;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("edit-box").style.display = "block";
}

function saveAnchor() {
    const name = document.getElementById("edit-name").value.trim();
    const position = document.getElementById("edit-position").value.trim();

    if (!name || !position) {
        alert("Both name and position are required.");
        return;
    }

    if (currentAnchorId === null) {
        // Create new anchor
        const newAnchor = document.createElement("div");
        newAnchor.classList.add("anchor-item");

        const anchorLink = document.createElement("a");
        anchorLink.href = "#";
        anchorLink.innerText = name;

        const anchorPosition = document.createElement("div");
        anchorPosition.classList.add("position");
        anchorPosition.innerText = position;

        // Add edit and remove buttons
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = function () {
            openEditBox(newAnchor.id);
        };

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = function () {
            removeAnchor(newAnchor.id);
        };

        newAnchor.appendChild(anchorLink);
        newAnchor.appendChild(anchorPosition);
        newAnchor.appendChild(editButton);
        newAnchor.appendChild(removeButton);

        // Assign unique id for new anchor
        newAnchor.id = "anchor-" + anchorCount;

        document.getElementById("anchor-container").appendChild(newAnchor);

        anchorCount++;
    } else {
        // Update existing anchor
        const anchor = document.getElementById(currentAnchorId);
        anchor.querySelector("a").innerText = name;
        anchor.querySelector(".position").innerText = position;
    }

    closeEditBox();
}

function closeEditBox() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("edit-box").style.display = "none";
}

function removeAnchor(anchorId) {
    const anchor = document.getElementById(anchorId);
    anchor.remove();
    anchorCount--;
}
