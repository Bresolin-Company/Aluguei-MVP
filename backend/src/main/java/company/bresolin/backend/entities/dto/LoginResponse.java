package company.bresolin.backend.entities.dto;

@SuppressWarnings("unused")
public record LoginResponse(String accessToken, Long expiresIn, String role) {
}
