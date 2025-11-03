package com.resumeAnlayazer.backend.model;

import jakarta.persistence.*;

import java.time.Instant;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadTextModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hr_user_id", nullable = false)
    private HRUserModel hrUser;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "extracted_text", columnDefinition = "TEXT")
    private String extractedText;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
        if (status == null || status.isBlank()) {
            status = "PENDING";
        }
    }

    // Explicit getters to avoid depending solely on Lombok in IDE/static analysis
    public Long getId() {
        return this.id;
    }

    public HRUserModel getHrUser() {
        return this.hrUser;
    }

    public String getFileName() {
        return this.fileName;
    }

    public String getExtractedText() {
        return this.extractedText;
    }

    public String getStatus() {
        return this.status;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }
}
