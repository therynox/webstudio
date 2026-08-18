import React, {
  useRef,
  useState,
} from "react";

import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

export default function ImageUploader({
  label = "Upload Image",

  value = "",

  onChange,

  multiple = false,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Normalize Existing Image
  |--------------------------------------------------------------------------
  */

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (typeof image === "string") {
      return image;
    }

    return image.url || "";
  };

  /*
  |--------------------------------------------------------------------------
  | Upload Files
  |--------------------------------------------------------------------------
  */

  const handleFiles = async (
    fileList
  ) => {
    const files = Array.from(
      fileList || []
    );

    if (!files.length) {
      return;
    }

    setError("");

    const validFiles =
      files.filter((file) =>
        file.type.startsWith(
          "image/"
        )
      );

    if (!validFiles.length) {
      setError(
        "Please select image files only."
      );

      return;
    }

    try {
      setUploading(true);

      /*
      |--------------------------------------------------------------------------
      | FormData
      |--------------------------------------------------------------------------
      */

      const formData =
        new FormData();

      validFiles.forEach(
        (file) => {
          formData.append(
            "files",
            file
          );
        }
      );

      /*
      |--------------------------------------------------------------------------
      | Upload To Backend
      |--------------------------------------------------------------------------
      */

      const response =
        await api.post(
          "/uploads",
          formData,
          {}
        );

      const uploaded =
        response.data?.data || [];

      if (!uploaded.length) {
        throw new Error(
          "Server did not return uploaded images."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | SINGLE IMAGE
      |--------------------------------------------------------------------------
      */

      if (!multiple) {
        const uploadedImage =
          uploaded[0];

        /*
         * IMPORTANT:
         *
         * Save the real server path.
         *
         * NOT:
         * blob:http://localhost...
         *
         * YES:
         * /images/projects/file.jpg
         */

        onChange(
          uploadedImage.url
        );

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | MULTIPLE IMAGES
      |--------------------------------------------------------------------------
      */

      const existingImages =
        Array.isArray(value)
          ? value
          : [];

      const newImages =
        uploaded.map(
          (
            image,
            index
          ) => ({
            url: image.url,

            caption: "",

            order:
              existingImages.length +
              index,
          })
        );

      onChange([
        ...existingImages,
        ...newImages,
      ]);
    } catch (err) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        err
      );

      const message =
        err.response?.data
          ?.message ||
        err.message ||
        "Image upload failed.";

      setError(message);
    } finally {
      setUploading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Input Change
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (event) => {
    event.stopPropagation();
    const files = event.target.files;
    if (!files || files.length === 0) return;
    void handleFiles(files);
    // Reset only after the current selection has been captured.
    event.target.value = "";
  };

  /*
  |--------------------------------------------------------------------------
  | Drag & Drop
  |--------------------------------------------------------------------------
  */

  const handleDrop = (
    event
  ) => {
    event.preventDefault();

    setDragging(false);

    handleFiles(
      event.dataTransfer.files
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Image
  |--------------------------------------------------------------------------
  */

  const removeImage = (
    index
  ) => {
    if (!multiple) {
      onChange("");

      return;
    }

    const updated =
      Array.isArray(value)
        ? [...value]
        : [];

    updated.splice(
      index,
      1
    );

    const reordered =
      updated.map(
        (
          image,
          imageIndex
        ) => ({
          ...(typeof image ===
          "string"
            ? {
                url: image,
                caption: "",
              }
            : image),

          order: imageIndex,
        })
      );

    onChange(
      reordered
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div style={wrapperStyle}>
      {/* LABEL */}

      <div style={labelStyle}>
        {label}
      </div>

      {/* UPLOAD AREA */}

      <div
        onClick={(event) => {
          if (uploading || event.target === inputRef.current) return;
          inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();

          if (!uploading) {
            setDragging(true);
          }
        }}
        onDragLeave={() => {
          setDragging(false);
        }}
        onDrop={handleDrop}
        style={{
          ...uploadBoxStyle,

          ...(dragging
            ? activeUploadBoxStyle
            : {}),

          ...(uploading
            ? uploadingStyle
            : {}),
        }}
      >
        <input
          ref={inputRef}
          type="file"
          id={`image-upload-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          name="images"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple={multiple}
          onClick={(event) => event.stopPropagation()}
          onChange={handleInputChange}
          style={{
            display: "none",
          }}
        />

        <div style={uploadIcon}>
          {uploading
            ? "..."
            : "+"}
        </div>

        <div style={uploadTitle}>
          {uploading
            ? "Uploading image..."
            : multiple
            ? "Upload project images"
            : "Upload cover image"}
        </div>

        <div
          style={
            uploadDescription
          }
        >
          {uploading
            ? "Please wait..."
            : "Drag & drop or click to browse"}
        </div>

        <div style={uploadFormat}>
          JPG · PNG · WEBP · GIF · SVG
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div style={errorBox}>
          {error}
        </div>
      )}

      {/* SINGLE IMAGE */}

      {!multiple &&
        value && (
          <SinglePreview
            image={value}
            onRemove={() =>
              removeImage()
            }
          />
        )}

      {/* MULTIPLE IMAGES */}

      {multiple &&
        Array.isArray(value) &&
        value.length > 0 && (
          <div
            style={galleryGrid}
          >
            {value.map(
              (
                image,
                index
              ) => {
                const imageUrl =
                  getMediaUrl(getImageUrl(image));

                if (!imageUrl) {
                  return null;
                }

                return (
                  <div
                    key={`${imageUrl}-${index}`}
                    style={
                      galleryItem
                    }
                  >
                    <div
                      style={
                        galleryImageWrapper
                      }
                    >
                      <img
                        src={
                          imageUrl
                        }
                        alt={`Gallery ${
                          index +
                          1
                        }`}
                        style={
                          galleryImage
                        }
                        onError={(
                          event
                        ) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        style={
                          galleryRemove
                        }
                      >
                        ×
                      </button>
                    </div>

                    <div
                      style={
                        galleryNumber
                      }
                    >
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Single Preview
|--------------------------------------------------------------------------
*/

function SinglePreview({
  image,
  onRemove,
}) {
  const imageUrl =
    typeof image === "string"
      ? image
      : image?.url || "";

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      style={
        previewWrapper
      }
    >
      <img
        src={getMediaUrl(imageUrl)}
        alt="Preview"
        style={
          previewImage
        }
      />

      <button
        type="button"
        onClick={onRemove}
        style={
          removeButton
        }
      >
        Remove
      </button>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/

const wrapperStyle = {
  width: "100%",
};

const labelStyle = {
  marginBottom: "10px",
  color: "#aaa",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.04em",
};

const uploadBoxStyle = {
  minHeight: "170px",
  border:
    "1px dashed #333",
  borderRadius: "14px",
  background: "#0b0b0b",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  cursor: "pointer",

  transition:
    "all 0.2s ease",
};

const activeUploadBoxStyle = {
  borderColor:
    "#ff7a00",

  background:
    "#120d08",
};

const uploadingStyle = {
  opacity: 0.65,
  cursor: "wait",
};

const uploadIcon = {
  width: "38px",
  height: "38px",

  borderRadius: "50%",

  border:
    "1px solid #333",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "#ff7a00",

  fontSize: "24px",

  marginBottom: "12px",
};

const uploadTitle = {
  color: "#fff",
  fontSize: "13px",
  fontWeight: "600",
};

const uploadDescription = {
  marginTop: "6px",
  color: "#666",
  fontSize: "11px",
};

const uploadFormat = {
  marginTop: "12px",
  color: "#444",
  fontSize: "9px",
  letterSpacing: "0.15em",
};

const errorBox = {
  marginTop: "10px",
  padding: "10px 12px",

  border:
    "1px solid #542222",

  borderRadius: "8px",

  background:
    "#1a0d0d",

  color: "#ff7777",

  fontSize: "11px",
};

const previewWrapper = {
  position: "relative",

  marginTop: "15px",

  borderRadius: "12px",

  overflow: "hidden",

  border:
    "1px solid #222",

  background: "#0d0d0d",
};

const previewImage = {
  width: "100%",
  height: "220px",

  objectFit: "cover",

  display: "block",
};

const removeButton = {
  position: "absolute",

  top: "10px",
  right: "10px",

  border:
    "1px solid #542222",

  background:
    "#1a0d0d",

  color: "#ff7777",

  padding: "7px 10px",

  borderRadius: "7px",

  cursor: "pointer",

  fontSize: "11px",
};

const galleryGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fill, minmax(160px, 1fr))",

  gap: "12px",

  marginTop: "15px",
};

const galleryItem = {
  minWidth: 0,
};

const galleryImageWrapper = {
  position: "relative",

  overflow: "hidden",

  borderRadius: "10px",

  border:
    "1px solid #222",

  background: "#0d0d0d",
};

const galleryImage = {
  width: "100%",

  height: "130px",

  objectFit: "cover",

  display: "block",
};

const galleryRemove = {
  position: "absolute",

  top: "7px",
  right: "7px",

  width: "26px",
  height: "26px",

  border: "none",

  borderRadius: "50%",

  background:
    "rgba(0,0,0,0.75)",

  color: "#fff",

  cursor: "pointer",

  fontSize: "18px",
};

const galleryNumber = {
  marginTop: "6px",

  color: "#555",

  fontSize: "9px",

  fontWeight: "700",

  letterSpacing: "0.15em",
};