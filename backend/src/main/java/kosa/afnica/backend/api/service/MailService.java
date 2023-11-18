package kosa.afnica.backend.api.service;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {

    public void sendEmail(String toEmail, String title, String text);

    public SimpleMailMessage createEmailForm(String toEmail, String title, String text);
}
