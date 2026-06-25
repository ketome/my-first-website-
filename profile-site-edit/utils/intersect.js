const Intersect = {
  observe(els, cb, opts={threshold:.1}) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ cb(e.target); io.unobserve(e.target); } });
    }, opts);
    (Array.isArray(els)?els:[els]).forEach(el=>io.observe(el));
    return io;
  },
};
