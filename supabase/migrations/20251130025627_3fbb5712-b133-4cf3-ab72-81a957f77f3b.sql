-- Add DELETE policies for admin_roles table
CREATE POLICY "Only admins can delete quote submissions"
ON public.quote_submissions
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));