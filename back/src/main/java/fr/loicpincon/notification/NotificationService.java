package fr.loicpincon.notification;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class NotificationService {


	private final JavaMailSender mailSender;

	public void send(Type type, String to, String object, String subject, String content) throws MessagingException {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(apply(subject, content), true);
		helper.setFrom("news@lucieetloic2026.ovh");
		mailSender.send(mimeMessage);
	}


	private String apply(String subject, String content) {
		final URL resource = getClass().getResource("/mails/template.html");
		try {
			String s = Files.readString(Path.of(resource.getPath()), Charset.defaultCharset());
			s = s.replace("${sujet}", subject);
			s = s.replace("${content}", content);
			return s;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	@PostConstruct
	public void init() throws MessagingException {
		this.send(Type.MAIL, "loic.pincon29@gmail.com", "Blabla", "Relance", "tu as pas paye frere");
	}

}
