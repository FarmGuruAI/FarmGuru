import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Get in touch with our team for support or inquiries
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-foreground px-8 py-3 rounded-xl w-full font-medium flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground mb-2">Our friendly team is here to help.</p>
                <a href="mailto:harishvattikulla@gmail.com" className="text-primary hover:text-primary-300 font-medium">harishvattikulla@gmail.com</a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground mb-2">Mon-Fri from 9am to 6pm IST.</p>
                <a href="tel:+919337223874" className="text-primary hover:text-primary-300 font-medium">+91 93372 23874</a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground mb-2 text-sm">Centurion University of Technology and Management (CUTM)</p>
                <p className="text-primary font-medium text-sm leading-relaxed">
                  Paralakhemundi campus, Village Alluri Nagar,<br />
                  P.O. – R Sitapur, Via-Uppalada,<br />
                  Paralakhemundi, Odisha – 761211, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
