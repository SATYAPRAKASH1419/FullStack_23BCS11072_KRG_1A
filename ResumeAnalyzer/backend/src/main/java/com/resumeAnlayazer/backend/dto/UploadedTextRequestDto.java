package com.resumeAnlayazer.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadTextRequestDTO {
    @NotNull(message = "HR User ID is required")
    private Long hrUserId;

    @NotBlank(message = "File name is required")
    private String fileName;

    @NotBlank(message = "Extracted text must not be blank")
    private String extractedText;

}
