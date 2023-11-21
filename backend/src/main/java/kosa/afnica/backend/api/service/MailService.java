package kosa.afnica.backend.api.service;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {

    void sendMessage(String email) throws Exception;
}
